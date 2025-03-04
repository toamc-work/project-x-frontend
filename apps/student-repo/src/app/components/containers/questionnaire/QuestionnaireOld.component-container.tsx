import React, { FC, useState } from 'react';
import { QuestionnaireWidget } from '../../widgets/questionnaire/Questionnaire.component-widget';
import { useNavigate } from 'react-router-dom';
//import { useSocketEvent } from '../../../hooks/useSocket';
//import { socket } from '../../../../socket';
import { useOnMount } from '@shared-hooks';
import { IQuestionnaire, IQuestionData } from '../../../providers/api/questionnaire-mock/response/questionnaire.response';

type QuestionnaireProps = unknown;

const initialValues: IQuestionData = {
  questionId: '0',
  levelDifficulty: 'Intermediate',
  possibleAnswers: ['lol', 'asd', 'Gbrish', 'Gbrush'],
  text: 'question pull didn\'t succeeded',
  subTopic: 'ForHonor'
}

// startQuestionnaireSession (RestAPI)
// getNextQuestionnaireQuestion (RestAPI)
// getLastQuestionnaireResults (RestAPI)


// questionnaireIsAboutToClosePrompt (Socket)
// questionnaireIsClosedPrompt (Socket)

const Questionnaire: FC<QuestionnaireProps> = (_props): React.JSX.Element => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState<typeof initialValues>(initialValues);

  /**api workflow
   * start questionnaire initiate sequence
   * provide first question params
   * send chosen answer and fetch for the next question
   * final question initiate end sequence move to finished page display data: statistics and panel of questions answered
   *  green for correct red for incorrect and a review dialog at each question to display a review
   *
   */
  // const questionnaireMock = {
  //   questionnaireId: 1,
  //   duration: 180000,
  //   totalQuestions: 3,
  //   sessionId: '4eac2c9f-5a2a-4f6d-a57b-9df7d6e8b8c1', // Example UUID
  //   data: {
  //     questionId: '1',
  //     levelDifficulty: 'Beginner',
  //     text: 'What is the capital of France?',
  //     possibleAnswers: ['London', 'Paris', 'Berlin', 'Madrid'],
  //     subTopic: 'Capitals',
  //   },
  // };

  // const nextQuestion = {
  //   sessionId: '4eac2c9f-5a2a-4f6d-a57b-9df7d6e8b8c1',
  //   data: {
  //     questionId: '2',
  //     levelDifficulty: 'Intermediate',
  //     text: 'What is 3 times 5?',
  //     possibleAnswers: ['10', '12', '15', '20'],
  //     subTopic: 'Multiplication',
  //   },
  // };

  // const lastQuestion = {
  //   sessionId: '4eac2c9f-5a2a-4f6d-a57b-9df7d6e8b8c1',
  //   data: {
  //     questionId: '3',
  //     levelDifficulty: 'Hard',
  //     text: 'What is answer to life',
  //     possibleAnswers: ['113', '7', '82', '42'],
  //     subTopic: 'Magic',
  //   },
  // };

  const possibleAnswers = [
    {
      questionID: '1',
    },
    {
      questionID: '2',
    },
    {
      questionID: '3',
    },
    {
      questionID: '4',
    },
  ];
  const handleDiscard = () => {
    /**api discard
     * socket close questionnaire session
     */
  //  useSocketEvent("discard-session", )
  };
  // const handleFinish = () => {
  //   useSocketEvent("questionnaire-is-closed", () => {
  //     navigate('/questionnaire/results')
  //   })
  // };

  const startQuestionnaire = () => {
    //api start question returns data of questionnaire session id and params
    const data: IQuestionnaire = {
      questionnaireId: 1,
      totalQuestions: 3,
      sessionId: '4eac2c9f-5a2a-4f6d-a57b-9df7d6e8b8c1', // Example UUID
    };
    return data;
  };

  const getFirstQuestion = () => {
    //api request to receive question details
    const data: IQuestionData = {
      questionId: '1',
      levelDifficulty: 'Beginner',
      text: 'What is the capital of France?',
      possibleAnswers: ['London', 'Paris', 'Berlin', 'Madrid'],
      subTopic: 'Capitals'
    };
    return data;
  }

  const nextQuestion = () => {
    //api request to receive question details
    const data: IQuestionData = {
      questionId: '2',
      levelDifficulty: 'Intermediate',
      text: 'What is 3 times 5?',
      possibleAnswers: ['10', '12', '15', '20'],
      subTopic: 'Multiplication',
    };
    return data;
  }

  useOnMount(() => {
    const questionnaireData = startQuestionnaire();
    setQuestion(getFirstQuestion());
  });

  return (
    // <QuestionnaireWidget.Main
    <>
      {/* questionID={question.questionId}
      questionLevel={question.levelDifficulty}
      handleClose={handleDiscard}
    > */}
      <QuestionnaireWidget.Timer
        timeOfEnd={1740048060000}
        questionID={question.questionId}
      ></QuestionnaireWidget.Timer>
      <QuestionnaireWidget.Question questionText={question.text}></QuestionnaireWidget.Question>
      <QuestionnaireWidget.PossibleAnswers
        render={{
          data: question.possibleAnswers,
          mapper: (PossibleAnswer) => (
            <PossibleAnswer
              onClick={(answerID) => {
                console.log(answerID);
                //should submit question and receive the next question to display
                setQuestion(nextQuestion());
              }}
            />
          ),
        }}
      ></QuestionnaireWidget.PossibleAnswers>
      </>
    // {/* </QuestionnaireWidget.Main> */}
  );
};

export default Questionnaire;
