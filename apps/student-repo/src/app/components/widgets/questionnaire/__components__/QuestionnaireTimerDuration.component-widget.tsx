import React, { FC } from 'react';
import { Paper, Typography } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import {} from '../../../../hooks/useSocket';
import { useStopwatch, useTimer } from 'react-timer-hook';
import { utcToLocal } from '../../../../providers/utils/utcToLocal';

type QuestionnaireTimerProps = {
  questionID: string;
  timeOfEnd: number;
};

export const QuestionnaireTimer: FC<QuestionnaireTimerProps> = ({
  questionID,
  timeOfEnd:expiryTimestamp,
}): React.JSX.Element => {

  

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
  <Timer  />
  <StopWatch/>
    </Paper>
  );
};


const Timer = React.memo(() => {
  const date = new Date(utcToLocal(Date.now() +  30 * 60 * 1000) )
  const { minutes, seconds } = useTimer({ expiryTimestamp: date })

  return (
    <Typography>
    <TimerOutlinedIcon /> { `${minutes}:${seconds}` };
    </Typography>
  )
})

const StopWatch = React.memo(() => {
  const date = new Date(utcToLocal())
  const { minutes, seconds} = useStopwatch({autoStart: true, offsetTimestamp: date,})
  return (
    <Typography>
    <TimerOutlinedIcon /> { `${minutes}:${seconds}` };
    </Typography>
  )
})