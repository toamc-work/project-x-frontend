import React, { FC, useState } from 'react';
import { useOnMount } from '../../hooks/useOnMount.hook';
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';

interface CompleteGuardianSignupStudentProps {
  submitGuardianSignupStudentComplete: () => Promise<void>;
  handleContinue: () => void;
}

const CompleteGuardianSignupStudent: FC<CompleteGuardianSignupStudentProps> = ({
  submitGuardianSignupStudentComplete,
  handleContinue,
}): React.JSX.Element => {
  const [loading, setLoading] = useState(true);

  useOnMount(() => {
    const action = async () => {
      await submitGuardianSignupStudentComplete();
      setLoading(() => false);
    };

    action();
  });
  if (loading) return <span>loading</span>;

  return (
    <Stack spacing={2} alignItems="center">
      <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
      <Typography variant="h5">{'Student signed up!'}</Typography>
      <Typography variant="body2" color="textSecondary">
        {'You have successfully signed up the student. You can now continue.'}
      </Typography>
      <Button
        sx={{
          maxWidth: 400,
          width: 'fit-content',
          mx: 'auto',
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
        }}
        variant="outlined"
        color="primary"
        onClick={handleContinue}
      >
        {'Back to profile'}
      </Button>
    </Stack>
  );
};

export default CompleteGuardianSignupStudent;
