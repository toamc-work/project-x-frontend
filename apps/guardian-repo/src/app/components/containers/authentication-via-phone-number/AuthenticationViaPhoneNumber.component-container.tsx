import { Button, Paper, Typography } from '@mui/material';
import React, { FC, useContext, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import { InvalidOtpException } from '@common/exceptions';
import {
  AuthenticationFormViaPhoneNumberWidget,
  VerificationCodeInputWidget,
} from '@shared-ui/widgets';
import { IVerificationCodeInput } from '@common/interfaces';

import CompleteSignin from '../../static/CompleteSignin.component-static';
import authService from '../../../providers/api/auth/auth.service';
import { AuthenticationStartSessionOtpViaSmsDto } from '../../../providers/api/auth/dto/authentication-start-session-otp-via-sms.dto';
import { AuthenticationViaPhoneNumberErrorContext } from '../../pages/signin/context/AuthenticationViaPhoneNumberErrorContextProvider.context';
import GuardianChangePhoneDialog from '../../dialogs/guardian-change-phone/GuardianChangePhone.component-dialog';

type AuthenticationViaPhoneNumberProps = unknown;

const AuthenticationViaPhoneNumber: FC<AuthenticationViaPhoneNumberProps> = (
  _props
): React.JSX.Element => {
  const navigate = useNavigate();
  const { errors, pubSub: errorPubSub$ } = useContext(
    AuthenticationViaPhoneNumberErrorContext
  );

  useEffect(() => {
    if (errors.sessionExpired) {
      navigate('/auth/signin', { replace: true });
      errorPubSub$.publish('session-refreshed');
    }
  }, [errorPubSub$, errors.sessionExpired, navigate]);

  const handleFormSubmission = async (
    dto: AuthenticationStartSessionOtpViaSmsDto
  ) => {
    try {
      await authService.guardianSigninSessionStartOtpSms(dto);
      errorPubSub$.publish('session-start');
      navigate('verify', { relative: 'path' });
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      await authService.guardianSigninSessionResendOtpSms();
      errorPubSub$.publish('session-restart');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleVerifyVerificationCode = async (dto: IVerificationCodeInput) => {
    try {
      const {
        data: { verification },
      } = await authService.guardianSigninSessionVerifyOtp(dto);
      if (verification === 'granted') {
        errorPubSub$.publish('session-verified');
        navigate('../complete', { relative: 'path' });
      } else {
        errorPubSub$.throw(new InvalidOtpException('invalid otp'));
      }
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleSigninSessionComplete = async () => {
    try {
      await authService.guardianSigninSessionComplete();
      errorPubSub$.publish('session-completed');
      navigate('/dashboard');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  return (
    <Routes>
      <Route
        index
        element={<AuthenticationForm submitForm={handleFormSubmission} />}
      />
      <Route
        path="verify"
        element={
          <VerificationCodeInputWidget
            error={errors.invalidOtp}
            submitVerificationCode={handleVerifyVerificationCode}
            resendVerificationCode={handleResendVerificationCode}
            message={
              errors.invalidOtp
                ? 'Invalid verification code'
                : 'Please enter verification code'
            }
          />
        }
      />
      <Route
        path="complete"
        element={
          <CompleteSignin submitSigninComplete={handleSigninSessionComplete} />
        }
      />
    </Routes>
  );
};

interface AuthenticationFormProps {
  submitForm: (dto: AuthenticationStartSessionOtpViaSmsDto) => Promise<void>;
}

const AuthenticationForm: FC<AuthenticationFormProps> = ({
  submitForm,
}): React.JSX.Element => {
  const { errors } = useContext(AuthenticationViaPhoneNumberErrorContext);
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
        flexDirection: 'column',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" component={'h1'} mb={2} textAlign={'center'}>
        {'Sign In'}
      </Typography>
      <AuthenticationFormViaPhoneNumberWidget
        btnTxt="Submit"
        regionCode="IL"
        submit={submitForm}
        error={errors.phoneNumberDoesNotExists}
        message={
          errors.phoneNumberDoesNotExists
            ? 'Phone number does not exists'
            : undefined
        }
      />
      <GuardianChangePhoneDialog
        render={(openDialog) => (
          <Button
            onClick={openDialog}
            variant="text"
            sx={{
              color: 'primary.main',
              mx: 'auto',
              p: 1,
              borderRadius: 1,
            }}
          >
            {'Lost Access? Use New Number'}
          </Button>
        )}
      />

      <Link to={'/auth/signup'}>{"Don't have an account yet"}</Link>
    </Paper>
  );
};

export default AuthenticationViaPhoneNumber;
