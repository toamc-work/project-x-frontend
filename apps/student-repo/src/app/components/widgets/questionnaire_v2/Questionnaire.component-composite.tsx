import React from 'react';
import {
  Main,
  QuestionnaireInfo,
  DiscardQuestionnaire,
  QuestionTitle,
  PossibleAnswers,
  QuestionDifficulty,
  Hint,
  QuestionNumber,
  SkipQuestion,
  SubmitQuestion,
  TimerDown,
  TimerUp,
  PossibleAnswer,
} from './layout';
import { utcToLocal } from '../../../providers/utils/utcToLocal';
import { useStopwatch, useTimer } from 'react-timer-hook';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

interface QuestionnaireProps extends React.FC<React.PropsWithChildren> {
  TimerUp: React.FC<object>;
  TimerDown: React.FC<{ expiryTimestamp: number }>;
  QuestionTitle: React.FC<{ questionTitle: string }>;
  QuestionnaireInfo: React.FC<{ questionnaireInfo: string }>;
  DiscardQuestionnaire: React.FC<{ handleDiscard: () => void }>;
  PossibleAnswers: React.FC<{
    render: {
      data: [string, string, string, string] | [];
      mapper: (
        HOC: React.ComponentType<{ onClick: (answerID: string) => void }>
      ) => React.JSX.Element;
    };
  }>;
  QuestionDifficulty: React.FC<{ questionDifficulty: string }>;
  // Hint: React.FC<{ children: React.ReactNode }>;
  QuestionNumber: React.FC<{ questionNumber: string }>;
  SkipQuestion: React.FC<{ handleSkip: () => void }>;
  // SubmitQuestion: React.FC<{ children: React.ReactNode }>;

}

const Questionnaire: QuestionnaireProps = ({ children }) => {
  return <Main>{children}</Main>;
};

Questionnaire.QuestionTitle = ({questionTitle}) => {
  return <QuestionTitle>{questionTitle}</QuestionTitle>;
};

Questionnaire.QuestionnaireInfo = ({questionnaireInfo}) => {
  return <QuestionnaireInfo>{questionnaireInfo}</QuestionnaireInfo>;
};

Questionnaire.DiscardQuestionnaire = ({ handleDiscard }) => {
  return <DiscardQuestionnaire onClick={handleDiscard} >Button to give Up</DiscardQuestionnaire>;
};

Questionnaire.PossibleAnswers = ({ render }) => {
  return (
    <PossibleAnswers>
      {render.data.map((possibleAnswerContent, index) => {
        return render.mapper(({ onClick }) => (
          <div onClick={() => onClick(possibleAnswerContent)}>
            <PossibleAnswer key={`${index}-${possibleAnswerContent}`}>{possibleAnswerContent}</PossibleAnswer>
          </div>
        ));
      })}
    </PossibleAnswers>
  );
};

Questionnaire.QuestionDifficulty = ({ questionDifficulty }) => {
  return <QuestionDifficulty>{questionDifficulty}</QuestionDifficulty>;
};

// //ToDo: Add the hint to the Questionnaire component
// Questionnaire.Hint = ({ children }: { children: React.ReactNode }) => {
//   return <Hint>{children}</Hint>;
// };

Questionnaire.QuestionNumber = ({ questionNumber }: { questionNumber: string }) => {
  return <QuestionNumber>{questionNumber}</QuestionNumber>;
};

//ToDo: Add the skip to the Questionnaire component
Questionnaire.SkipQuestion = ({ handleSkip }) => {
  return <SkipQuestion onClick={handleSkip}>Click Here to skip question</SkipQuestion>;
};

// Questionnaire.SubmitQuestion = ({ children }: { children: React.ReactNode }) => {
//   return <SubmitQuestion>{children}</SubmitQuestion>;
// };

Questionnaire.TimerDown = ({ expiryTimestamp }) => {
  const date = new Date(utcToLocal(expiryTimestamp))
  
  const { minutes, seconds } = useTimer({ expiryTimestamp: date })
  
  return (
    <TimerDown>
      <TimerOutlinedIcon /> {`${minutes}:${seconds}`}
    </TimerDown>
  )
};

Questionnaire.TimerUp = () => {
  const date = new Date(utcToLocal())
  const { minutes, seconds} = useStopwatch({autoStart: true, offsetTimestamp: date,})
  return (
    <TimerUp>
    <TimerOutlinedIcon /> { `${minutes}:${seconds}` }
    </TimerUp>
  )
};

export { Questionnaire };
