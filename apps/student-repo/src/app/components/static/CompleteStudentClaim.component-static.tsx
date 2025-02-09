import React, { FC, useState } from 'react';
import { useOnMount } from '../../hooks/useOnMount.hook';
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';

interface CompleteStudentClaimProps {
  submitStudentClaimComplete: () => Promise<void>;
  handleContinue: () => void;
}

const CompleteStudentClaim: FC<CompleteStudentClaimProps> = ({
  submitStudentClaimComplete,
  handleContinue,
}): React.JSX.Element => {
  const [loading, setLoading] = useState(true);

  useOnMount(() => {
    const action = async () => {
      await submitStudentClaimComplete();
      setLoading(() => false);
    };

    action();
  });
  if (loading) return <span>loading</span>;

  return (
    <Stack spacing={2} alignItems="center">
      <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
      <Typography variant="h5">{'Student Claimed!'}</Typography>
      <Typography variant="body2" color="textSecondary">
        {'You have successfully claimed the student. You can now continue.'}
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

export default CompleteStudentClaim;
