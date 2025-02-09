import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useOnMount } from '../../hooks/useOnMount.hook';

interface CompleteStudentSigninProps {
  submitSigninComplete: () => Promise<void>;
}

const CompleteStudentSignin: FC<CompleteStudentSigninProps> = ({
  submitSigninComplete,
}): React.JSX.Element => {
  useOnMount(() => {
    const action = async () => {
      await submitSigninComplete();
    };

    action();
  });
  return (
    <Typography variant="h1" component={'h1'}>
      {'success'}
    </Typography>
  );
};

export default CompleteStudentSignin;
