import React, { FC, useState } from "react";
//import { useOnMount } from "src/hooks/useOnMount.hook";
import { Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";

interface MidGuardianChangePhoneProps {
  submitGuardianChangePhoneCompleteOtpSms: () => Promise<void>;
  //  handleContinue: () => void;
}

const MidGuardianChangePhone: FC<MidGuardianChangePhoneProps> = ({
  submitGuardianChangePhoneCompleteOtpSms,
  //handleContinue,
}): React.JSX.Element => {
  const [loading, setLoading] = useState(true);

  // useOnMount(() => {
  //   const action = async () => {
  //     await submitGuardianChangePhoneCompleteOtpSms();
  //     setLoading(() => false);
  //   };

  //   action();
  // });

  return (
    <Stack spacing={2} alignItems="center">
      <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
      <Typography variant="h5">{"Phone Changed!"}</Typography>
      <Typography variant="body2" color="textSecondary">
        {"You have successfully changed your phone number."}
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
        onClick={async () => {
          await submitGuardianChangePhoneCompleteOtpSms();
          setLoading(() => false);
          if (loading) return <>{"loading"}</>;
        }}
      >
        {"Continue to sign in"}
      </Button>
    </Stack>
  );
};

export default MidGuardianChangePhone;
