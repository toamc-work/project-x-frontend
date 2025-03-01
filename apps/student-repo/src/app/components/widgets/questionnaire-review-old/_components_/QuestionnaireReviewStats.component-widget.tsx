import { Paper, Typography } from '@mui/material';
import React, { FC } from 'react';

type QuestionnaireReviewStatsProps = {
  data: {
    answeredRight: number;
    allQuestions: number;
    averageTime: number;
  };
};

export const QuestionnaireReviewStats: FC<QuestionnaireReviewStatsProps> = ({
  data,
}): React.JSX.Element => {

  const formatTime = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '1400px',
        height: '40px',
        mx: 'auto',
      }}
    >
      <Typography>
        You answered: {data.answeredRight}/{data.allQuestions}
      </Typography>
      <Typography>
        Your average time spent on each question is: {formatTime(data.averageTime/1000)} minutes
      </Typography>
    </Paper>
  );
};
