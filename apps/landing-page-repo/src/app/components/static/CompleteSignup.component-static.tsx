import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useOnMount } from '@shared-hooks';

interface CompleteSignupProps {
  submitSignupComplete: () => Promise<void>;
}

const CompleteSignup: FC<CompleteSignupProps> = ({
  submitSignupComplete,
}): React.JSX.Element => {
  useOnMount(() => {
    const action = async () => {
      await submitSignupComplete();
    };

    action();
  });
  return (
    <Typography variant="h1" component={'h1'}>
      {'success'}
    </Typography>
  );
};

export default CompleteSignup;
