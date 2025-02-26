export * as QuestionnaireWidget from './__components__/exports'

import { IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';

type QuestionnaireProps = {
  questionID: string;
  questionLevel: string;
  handleClose: () => void;
};

const Questionnaire: FC<
  QuestionnaireProps & React.PropsWithChildren
> = ({ children, questionID, questionLevel, handleClose }) => {
  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '1400px',
          height: '40px',
          mx: 'auto',
        }}
      >
        <Typography textAlign={'center'} variant="h3" component="h3">
          Question No. {questionID}
        </Typography>
        <Typography textAlign={'center'} variant="h3" component="h3">
          Question Level: {questionLevel}
        </Typography>
        <IconButton sx={{ justifyContent: 'flex-end' }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Paper>
      <Paper>{children}</Paper>
    </>
  );
};

export default Questionnaire;