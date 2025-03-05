"use client";
import React, { use, ReactNode } from 'react';
import { Questionnaire } from '../../widgets/questionnaire/Questionnaire.component-composite';
// import QuestionnaireService from '../../../providers/api/questionnaire/questionnaire.service';
import {
  IQuestionnaire,
  IQuestion,
} from '../../../providers/api/questionnaire/response/questionnaire.response';
// import { utcToLocal } from '../../../providers/utils/utcToLocal';

// enum AnswerType {
//   Answered = 'answered',
//   Skipped = 'skipped',
//   Hinted = 'hint',
// }
// type LevelQuestionnaireProps = {
//   sessionPromise: Promise<ApiResponse<IQuestionnaire>>;
//   // questionPromise: Promise<ApiResponse<IQuestion>>;
// };

// const initialValues: IQuestion = {
//   text: "wow",
//   hint: [0, 1],
//   levelName: 'Beginner',
//   possibleAnswers: ["no", "Ish", "Sherlock", "Holmes"],
//   startTime: 0,
//   subtopicName: "Not",
//   topicName: 'Good'
// };

const LevelQuestionnaire = ({
  sessionPromise,
  // questionPromise,
}: {sessionPromise: Promise<ApiResponse<IQuestionnaire>>}): React.JSX.Element => {
  const { data: session } = use(sessionPromise);
  // let questionPromise = QuestionnaireService.questionnaireGetCurrentQuestion({
  //   sessionId: session.sessionId,
  // });
  // const [hintUsed, setHintUsed] = useState<boolean>(false);
  // // const questionnaire = questionnaireResponse.data;

  // const handleSubmit = async (answer: string, type: AnswerType) => {
  //   //api submit question with answer and type
  //   await QuestionnaireService.questionnaireSendPossibleAnswer({
  //     sessionId: session.sessionId,
  //     answer,
  //     event: type,
  //   });
  //   questionPromise = QuestionnaireService.questionnaireGetCurrentQuestion({
  //     sessionId: session.sessionId,
  //   });

  //   setHintUsed(false);
  // };

  // const handleExpired = () => {
  //   // continue to review
  // };

  // const handleHint = () => {
  //   // console.log('handle hint with index:', question.hint);
  //   setHintUsed(true);
  // };

  return (
    <div>
      {/* <QuestionWrapper questionPromise={questionPromise}>
        {(question) => (
          <>
            <Questionnaire.Info>
              Level Questionnaire / {question.topicName} -{' '}
              {question.subtopicName}
            </Questionnaire.Info>
            <Questionnaire.Title title={question.text} />
            <Questionnaire.Timer
              expiryTimestamp={
                session.expiryTimestamp
                  ? session.expiryTimestamp
                  : 1740834602000
              }
              onExpire={handleExpired}
            />
            <Questionnaire.StopWatch
              offsetTimestamp={new Date(utcToLocal(question.startTime))}
            />
            <Questionnaire.SkipBtn
              performSkipAction={() => handleSubmit('', AnswerType.Skipped)}
            />
            <Questionnaire.QuestionNumber
              questionNumber={`number ${1} / ${session.totalQuestions}`}
            />
            <Questionnaire.QuestionDifficulty level={question.levelName} />
            <Questionnaire.DiscardBtn
              performDiscardAction={() => console.log('preform discard action')}
            />
            <Questionnaire.HintBtn
              enabled={true}
              hint={question.hint}
              handleHint={handleHint}
            />
            <Questionnaire.PossibleAnswers
              render={{
                data: question.possibleAnswers,
                mapper: (PossibleAnswer, index) => {
                  return (
                    <PossibleAnswer
                      key={index}
                      isHinted={
                        hintUsed &&
                        question.hint &&
                        question.hint.includes(index)
                          ? true
                          : false
                      }
                      onClick={async (answer) =>
                        await handleSubmit(
                          answer,
                          hintUsed ? AnswerType.Hinted : AnswerType.Answered
                        )
                      }
                    />
                  );
                },
              }}
            />
          </>
        )}
      </QuestionWrapper> */}
    </div>
  );
};

// const QuestionWrapper: FC<{
//   children: (question: IQuestion) => ReactNode;
//   questionPromise: Promise<ApiResponse<IQuestion>>;
// }> = ({ questionPromise, children }) => {
//   const { data: question } = use(questionPromise);
//   return children(question);
// };
// //{console.log('possible answer args:', key, isHinted)}
export default LevelQuestionnaire;
