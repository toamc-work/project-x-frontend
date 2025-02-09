import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useOnMount } from '../../hooks/useOnMount.hook';

interface CompleteGuardianSignupProps {
  submitSignupComplete: () => Promise<void>;
}

const CompleteGuardianSignup: FC<CompleteGuardianSignupProps> = ({
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

export default CompleteGuardianSignup;
