import { IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';

type QuestionnaireContainerProps = {
  questionID: string;
  questionLevel: string;
  handleClose: () => void;
};

export const QuestionnaireContainer: FC<
  QuestionnaireContainerProps & React.PropsWithChildren
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
