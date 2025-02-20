import React, { FC } from 'react';
import { Paper, Typography } from '@mui/material';

type QuestionnaireQuestionProps = {
  questionText: string;
};

export const QuestionnaireQuestion: FC<QuestionnaireQuestionProps> = ({
  questionText,
}): React.JSX.Element => {
  return (
    <Paper>
      <Typography
        sx={{
          width: '1400px',
          height: '40px',
          mx: 'auto',
        }}
        variant="h2"
        align="center"
      >
        {questionText}
      </Typography>
    </Paper>
  );
};
