import React from 'react';
import { QuestionnaireInfoProps } from './interfaces/QuestionnaireInfo.interface';
import { QuestionnaireProps } from './interfaces/Questionnaire.interface';
import { KidsThemeProvider } from './styles/theme/theme';
import { QuestionnaireLayout } from './styles/layout/MainLayout.styled-component';
import { InfoUI } from './styles/ui/Info.ui';
import { QuestionTitleProps } from './interfaces/QuestionTitle.interface';
import { TitleUI } from './styles/ui/Title.ui';
import { PossibleAnswersProps } from './interfaces/PossibleAnswers.interface';
import { PossibleAnswersUI } from './styles/ui/PossibleAnswers.ui';
import { PossibleAnswerUI } from './styles/ui/PossibleAnswer.ui';
import { utcToLocal } from '../../../providers/utils/utcToLocal';
import { useStopwatch, useTimer } from 'react-timer-hook';
import { TimerUI } from './styles/ui/Timer.ui';
import { TimerOutlined as TimerOutlinedIcon } from '@mui/icons-material';
import { TimerProps } from './interfaces/Timer.interface';
import { StopWatchProps } from './interfaces/StopWatch.interface';
import { StopWatchUI } from './styles/ui/StopWatch.ui';
import { DiscardBtnProps } from './interfaces/DiscardButton.interface';
import { DiscardBtnUI } from './styles/ui/DiscardBtn.ui';
import { QuestionNumberProps } from './interfaces/QuestionNumber.interface';
import { QuestionNumberUI } from './styles/ui/QuestionNumber.ui';
import { QuestionDifficultyProps } from './interfaces/QuestionDifficulty.interface';
import { QuestionDifficultyUI } from './styles/ui/QuestionDifficulty.ui';
import { SkipBtnProps } from './interfaces/SkipButton.interface';
import { SkipBtnUI } from './styles/ui/SkipBtn.ui';
import { HintBtnProps } from './interfaces/HintButton.interface';
import { HintBtnUI } from './styles/ui/HintButton.ui';
interface QuestionnaireCompoundProps extends React.FC<QuestionnaireProps> {
  Info: React.FC<QuestionnaireInfoProps>;
  Title: React.FC<QuestionTitleProps>;
  DiscardBtn: React.FC<DiscardBtnProps>;
  PossibleAnswers: React.FC<PossibleAnswersProps>;
  Timer: React.FC<TimerProps>;
  StopWatch: React.FC<StopWatchProps>;
  QuestionNumber: React.FC<QuestionNumberProps>;
  QuestionDifficulty: React.FC<QuestionDifficultyProps>;
  SkipBtn: React.FC<SkipBtnProps>;
  HintBtn: React.FC<HintBtnProps>;
}

const Questionnaire: QuestionnaireCompoundProps = ({ children }) => {
  return (
    <KidsThemeProvider>
      <QuestionnaireLayout>{children}</QuestionnaireLayout>
    </KidsThemeProvider>
  );
};

Questionnaire.Info = ({ children }) => {
  return <InfoUI>{children}</InfoUI>;
};

Questionnaire.Title = ({ title }) => {
  return <TitleUI>{title}</TitleUI>;
};

Questionnaire.DiscardBtn = ({ performDiscardAction }) => {
  return <DiscardBtnUI onClick={performDiscardAction}>Give Up</DiscardBtnUI>;
};

Questionnaire.PossibleAnswers = ({ render }) => {
  return (
    <PossibleAnswersUI>
      {render.data.map((possibleAnswerContent, index) => {
        return render.mapper(
          ({ onClick }) => (
            <PossibleAnswerUI onClick={() => onClick(possibleAnswerContent)}>
              {possibleAnswerContent}
            </PossibleAnswerUI>
          ),
          index
        );
      })}
    </PossibleAnswersUI>
  );
};

Questionnaire.QuestionNumber = ({ questionNumber }) => {
  return <QuestionNumberUI>{questionNumber}</QuestionNumberUI>;
};

Questionnaire.QuestionDifficulty = ({ level }) => {
  return <QuestionDifficultyUI>{level}</QuestionDifficultyUI>;
};

Questionnaire.SkipBtn = ({ performSkipAction }) => {
  return <SkipBtnUI onClick={performSkipAction}>Skip</SkipBtnUI>;
};

Questionnaire.HintBtn = React.memo(({ enabled, hint, questionId }) => {
  if (enabled && hint !== null) {
    return (
      <HintBtnUI
        onClick={() => {
          console.log('should create a modal or a tooltip that show the hint');
        }}
        $variant="enabled"
      >
        Hint
      </HintBtnUI>
    );
  } else if (!enabled && hint !== null) {
    return <HintBtnUI $variant="disabled"> Hint</HintBtnUI>;
  } else {
    return null;
  }
});

Questionnaire.Timer = ({ expiryTimestamp }) => {
  const date = new Date(utcToLocal(expiryTimestamp));
  const { minutes, seconds } = useTimer({ expiryTimestamp: date });
  return (
    <TimerUI>
      <TimerOutlinedIcon
        sx={(theme) => ({
          ...theme.typography.h2,
          color: theme.palette.secondary.light,
        })}
      />{' '}
      {`${minutes}:${seconds}`}
    </TimerUI>
  );
};

Questionnaire.StopWatch = () => {
  const date = new Date(utcToLocal());
  const { minutes, seconds } = useStopwatch({
    autoStart: true,
    offsetTimestamp: date,
  });
  return (
    <StopWatchUI>
      <TimerOutlinedIcon
        sx={(theme) => ({
          ...theme.typography.h2,
          color: theme.palette.secondary.light,
        })}
      />
      {`${minutes}:${seconds}`}
    </StopWatchUI>
  );
};

export { Questionnaire };
