import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useOnMount } from '../../hooks/useOnMount.hook';

interface CompleteGuardianSigninProps {
  submitSigninComplete: () => Promise<void>;
}

const CompleteGuardianSignin: FC<CompleteGuardianSigninProps> = ({
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

export default CompleteGuardianSignin;
