import { Paper } from '@mui/material';
import React, { FC } from 'react';

type QuestionnaireReviewBodyProps = unknown;

export const QuestionnaireReviewBody: FC<
  QuestionnaireReviewBodyProps & React.PropsWithChildren
> = ({ children }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pt: 'auto',
        width: '1400px',
        height: '40px',
        mx: 'auto',
      }}
    >
      Well done! you finished your Questionnaire!
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: 'auto',
          width: '1400px',
          height: '40px',
          mx: 'auto',
        }}
      >
        
      {children}
    </Paper>
    </Paper>
  );
};
