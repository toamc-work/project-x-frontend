import { Box, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import React, { FC } from 'react';
import VerificationInput from 'react-verification-input';
import { Props } from './resources/types';

export const VerificationCodeInputWidget: FC<Props> = ({
  submitVerificationCode,
  resendVerificationCode,
  error,
  message,
}): React.JSX.Element => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        width: 'fit-content',
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <VerificationInput
        length={6}
        onComplete={(code) => submitVerificationCode({ code })}
        placeholder=""
        autoFocus
        classNames={{
          container: 'container',
          character: 'character',
          characterInactive: 'character--inactive',
          characterSelected: 'character--selected',
          characterFilled: 'character--filled',
        }}
      />
      <FormHelperText variant="filled" error={error}>
        {message}
      </FormHelperText>
      <Button
        sx={{
          maxWidth: 400,
          width: 'fit-content',
          mx: 'auto',
          mt: 4,
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
        onClick={resendVerificationCode}
      >
        Resend Verification Code
      </Button>
    </Box>
  );
};
