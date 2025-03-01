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
        marginTop: '40px',
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
          mx: 'auto',
        }}
      >
        
      {children}
    </Paper>
    </Paper>
  );
};
