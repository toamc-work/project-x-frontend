import React, { FC } from 'react';
import { Paper, Button, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

interface StartEmailVerificationProps {
  email: string;
  sendVerificationCode: () => Promise<unknown>;
}

const StartEmailVerification: FC<StartEmailVerificationProps> = ({
  email,
  sendVerificationCode,
}): React.JSX.Element => {
  return (
    <Paper
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField
        sx={{ maxWidth: '300px' }}
        fullWidth
        margin="normal"
        id="email-address"
        name="email"
        label="Email"
        value={email}
        variant="standard"
        disabled
        slotProps={{
          input: {
            startAdornment: <EmailIcon color="disabled" sx={{ mr: 1 }} />,
          },
        }}
      />
      <Button
        onClick={sendVerificationCode}
        sx={{
          maxWidth: 400,
          width: 'fit-content',
          mx: 'auto',
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
        variant="outlined"
      >
        {'Send Verification Code'}
      </Button>
    </Paper>
  );
};

export default StartEmailVerification;
