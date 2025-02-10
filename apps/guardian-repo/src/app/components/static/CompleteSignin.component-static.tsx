import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useOnMount } from '@shared-hooks';

interface CompleteSigninProps {
  submitSigninComplete: () => Promise<void>;
}

const CompleteSignin: FC<CompleteSigninProps> = ({
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

export default CompleteSignin;
