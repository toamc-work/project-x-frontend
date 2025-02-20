import React, { FC, useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {
  useSocketEvent,
  useSocketEventOnce,
} from '../../../../hooks/useSocket';
import { useDuration } from '../../../../hooks/useDuration';
import { Duration, formatDuration, getTime, interval, sub, toDate } from 'date-fns';

type QuestionnaireTimerProps = {
  questionID: string;
  timeOfEnd: number;
};

export const QuestionnaireTimer: FC<QuestionnaireTimerProps> = ({
  questionID,
  timeOfEnd,
}): React.JSX.Element => {
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  
  const localTime = getTime(new Date());
  const duration = useDuration(timeOfEnd - localTime);
  // setTimeLeft((timeOfEnd - localTime)/1000);
  
  
  useEffect(() => {
    setTimeSpent(0);
  }, [questionID]);

  useEffect(() => {
    // let countdownTimer: NodeJS.Timeout | undefined;
    let spentTimer: NodeJS.Timeout | undefined;

    if (isRunning) {
      spentTimer = setInterval(() => {
        setTimeSpent((prevTime: number) => prevTime + 1);
      }, 1000);
    }

    return () => {
      // if (countdownTimer) clearInterval(countdownTimer);
      if (spentTimer) clearInterval(spentTimer);
    };
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  const displayTimeLeft = (duration: Duration) => `${duration.minutes}:${duration.seconds} remain to complete quiz`


  // useSocketEvent('questionnaire-duration-update', (duration: number) => {
  //   setTimeLeft(duration);
  // });

  // useSocketEventOnce('questionnaire-duration-update', () => {
  //   setIsRunning(true);
  // });

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Typography>
        <TimerOutlinedIcon /> {displayTimeLeft(duration)}
      </Typography>
      <Typography>
        <TimerOutlinedIcon /> {formatTime(timeSpent)} Here on this question
      </Typography>
    </Paper>
  );
};
