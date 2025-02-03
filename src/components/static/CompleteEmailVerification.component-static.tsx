import { Button, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useOnMount } from "src/hooks/useOnMount.hook";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";

interface CompleteEmailVerificationProps {
  submitEmailVerificationComplete: () => Promise<void>;
  handleContinue: () => void;
}

const CompleteEmailVerification: FC<CompleteEmailVerificationProps> = ({
  submitEmailVerificationComplete,
  handleContinue,
}): React.JSX.Element => {
  const [loading, setLoading] = useState(true);

  useOnMount(() => {
    const action = async () => {
      await submitEmailVerificationComplete();
      setLoading(() => false);
    };

    action();
  });

  if (loading) return <>{"loading"}</>;
  return (
    <Stack spacing={2} alignItems="center">
      <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
      <Typography variant="h5">{"Email Verified!"}</Typography>
      <Typography variant="body2" color="textSecondary">
        {"Your email has been successfully verified. You can now continue."}
      </Typography>
      <Button
        sx={{
          maxWidth: 400,
          width: "fit-content",
          mx: "auto",
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
        variant="outlined"
        color="primary"
        onClick={handleContinue}
      >
        {"Back to profile"}
      </Button>
    </Stack>
  );
};

export default CompleteEmailVerification;
