import { useOnMount } from '@shared-hooks';
import questionnaireService from '../../../../providers/api/questionnaire/questionnaire.service';
import { createContext, useState } from 'react';
import { AnswerType } from '../../../../providers/api/questionnaire/dto/post-questionnaire-session-answer.dto';
import { StatusOption } from '../../../../providers/api/questionnaire/response/questionnaire.response';

type QuestionnaireContextProviderProps = {
  children: React.ReactNode;
  sessionId: string;
};

type QuestionnaireContextType = {
  session: CurrentSession;
};

export const QuestionnaireContext = createContext(
  {} as QuestionnaireContextType
);

export const QuestionnaireContextProvider = ({
  children,
  sessionId,
}: QuestionnaireContextProviderProps) => {
  const { session, error, loading, submitHandler } =
    useCurrentSession(sessionId);

  const submit = async (
    event: AnswerType,
    answer: string,
    options: { onReview: () => void; onCompleted: () => void } = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onReview: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCompleted: () => {},
    }
  ) => {
    submitHandler(event, answer);
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        session: { session, error, loading, submitHandler: submit },
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

type CurrentSession = {
  session: {
    questionnaire:
      | Awaited<
          ReturnType<typeof questionnaireService.getCurrentQuestionnaire>
        >['data']
      | undefined;

    question:
      | Awaited<
          ReturnType<
            typeof questionnaireService.questionnaireGetCurrentQuestion
          >
        >['data']
      | undefined;
    status: 'ongoing' | 'review' | 'completed';
  };
  loading: boolean;
  error: boolean;
  submitHandler: (
    event: AnswerType,
    answer: string,
    options?: {
      onReview: () => void;
      onCompleted: () => void;
    }
  ) => Promise<void>;
};

const useCurrentSession = (sessionId: string): CurrentSession => {
  const [questionnaire, setQuestionnaire] =
    useState<
      Awaited<ReturnType<typeof questionnaireService.getCurrentQuestionnaire>>
    >();
  const [question, setQuestion] =
    useState<
      Awaited<
        ReturnType<typeof questionnaireService.questionnaireGetCurrentQuestion>
      >
    >();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusOption>(StatusOption.Ongoing);

  const submitHandler = async (
    event: AnswerType,
    answer: string,

    options?: { onReview: () => void; onCompleted: () => void }
  ) => {
    try {
      setError(() => false);
      setLoading(() => true);
      await questionnaireService.questionnaireSendPossibleAnswer({
        event,
        answer,
        sessionId,
      });
      const {
        data: { status: sessionStatus },
      } = await questionnaireService.getCurrentQuestionnaireStatus({
        sessionId,
      });

      if (sessionStatus === StatusOption.Ongoing) {
        const fetchedQuestion =
          await questionnaireService.questionnaireGetCurrentQuestion({
            sessionId,
          });
        setQuestion(fetchedQuestion);
      } else if (sessionStatus === StatusOption.Review) {
        void options?.onReview();
      } else if (sessionStatus === StatusOption.Completed) {
        void options?.onCompleted();
      }
    } catch {
      setError(() => true);
    } finally {
      setLoading(() => false);
    }
  };

  useOnMount(() => {
    const apiRequest = async () => {
      const fetchedQuestionnaire =
        await questionnaireService.getCurrentQuestionnaire({ sessionId });
      const fetchedQuestion =
        await questionnaireService.questionnaireGetCurrentQuestion({
          sessionId,
        });
      setQuestionnaire(fetchedQuestionnaire);
      setQuestion(fetchedQuestion);
    };

    try {
      setError(() => false);
      setLoading(() => true);
      apiRequest();
    } catch {
      setError(() => true);
    } finally {
      setLoading(() => false);
    }
  });

  return {
    loading,
    error,
    submitHandler,
    session: {
      questionnaire: questionnaire?.data,
      question: question?.data,
      status: status,
    },
  };
};
