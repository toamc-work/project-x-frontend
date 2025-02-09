import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Role } from '../../../common/enums/role.enum';

import { InvalidOtpException } from '../../../common/errors/exceptions/custom.exception';
import CompleteGuardianSignin from '../../../components/static/CompleteGuardianSignin.component-static';
import CompleteStudentSignin from '../../../components/static/CompleteStudentSignin.component-static';
import AuthenticationFormViaPhoneNumberWidget from '../../../components/widgets/forms/AuthenticationFormViaPhoneNumber.component-widget';
import VerificationCodeInput from '../../../components/widgets/inputs/VerificationCodeInput.component-widget';
import authService from '../../../providers/api/auth/auth.service';
import { AuthenticationStartSessionOtpViaSmsDto } from '../../../providers/api/auth/dto/authentication-start-session-otp-via-sms.dto';
import { VerifyOtpDto } from '../../../providers/api/auth/dto/verify-otp.dto';
import { AuthenticationViaPhoneNumberErrorContext } from '../../pages/guest/signin/context/AuthenticationViaPhoneNumberErrorContextProvider.context';
import GuardianChangePhoneDialog from '../../../components/dialogs/guardian-change-phone/GuardianChangePhone.component-dialog';

type AuthenticationViaPhoneNumberProps = unknown;

const AuthenticationViaPhoneNumber: FC<AuthenticationViaPhoneNumberProps> = (
  _props
): React.JSX.Element => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(Role.Guardian);
  const { errors, pubSub: errorPubSub$ } = useContext(
    AuthenticationViaPhoneNumberErrorContext
  );

  useEffect(() => {
    if (errors.sessionExpired) {
      navigate('/auth/signin', { replace: true });
      errorPubSub$.publish('session-refreshed');
    }
  }, [errorPubSub$, errors.sessionExpired, navigate]);

  const startSessionOtpViaSms = useCallback(
    async (dto: AuthenticationStartSessionOtpViaSmsDto) =>
      role === Role.Guardian
        ? await authService.guardianSigninSessionStartOtpSms(dto)
        : await authService.studentSigninSessionStartOtpSms(dto),
    [role]
  );

  const resendSessionOtpViaSms = useCallback(
    async () =>
      role === Role.Guardian
        ? await authService.guardianSigninSessionResendOtpSms()
        : await authService.studentSigninSessionResendOtpSms(),
    [role]
  );

  const verifySessionOtp = useCallback(
    async (dto: VerifyOtpDto) =>
      role === Role.Guardian
        ? await authService.guardianSigninSessionVerifyOtp(dto)
        : await authService.studentSigninSessionVerifyOtp(dto),
    [role]
  );

  const completeSession = useCallback(
    async () =>
      role === Role.Guardian
        ? await authService.guardianSigninSessionComplete()
        : await authService.studentSigninSessionComplete(),
    [role]
  );

  const handleFormSubmission = async (
    dto: AuthenticationStartSessionOtpViaSmsDto
  ) => {
    try {
      await startSessionOtpViaSms(dto);
      errorPubSub$.publish('session-start');
      navigate('verify', { relative: 'path' });
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      await resendSessionOtpViaSms();
      errorPubSub$.publish('session-restart');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleVerifyVerificationCode = async (dto: VerifyOtpDto) => {
    try {
      const {
        data: { verification },
      } = await verifySessionOtp(dto);
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
      await completeSession();
      errorPubSub$.publish('session-completed');
      navigate(
        role === Role.Guardian ? '/parent/dashboard' : '/student/dashboard'
      );
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  return (
    <Routes>
      <Route
        index
        element={
          <MultiRoleAuthenticationForm
            submitForm={handleFormSubmission}
            setRole={setRole}
            role={role}
          />
        }
      />
      <Route
        path="verify"
        element={
          <VerificationCodeInput
            invalidOtp={errors.invalidOtp}
            submitVerificationCode={handleVerifyVerificationCode}
            resendVerificationCode={handleResendVerificationCode}
          />
        }
      />
      <Route
        path="complete"
        element={
          role === Role.Guardian ? (
            <CompleteGuardianSignin
              submitSigninComplete={handleSigninSessionComplete}
            />
          ) : (
            <CompleteStudentSignin
              submitSigninComplete={handleSigninSessionComplete}
            />
          )
        }
      />
    </Routes>
  );
};

interface MultiRoleAuthenticationFormProps {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  submitForm: (dto: AuthenticationStartSessionOtpViaSmsDto) => Promise<void>;
}

const MultiRoleAuthenticationForm: FC<MultiRoleAuthenticationFormProps> = ({
  submitForm,
  setRole,
  role,
}): React.JSX.Element => {
  const { errors } = useContext(AuthenticationViaPhoneNumberErrorContext);
  return (
    <Box
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
      <FormControl fullWidth sx={{ pt: 1 }}>
        <InputLabel id="role-select-label">{'User Type'}</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={role}
          onChange={({ target: { value } }) => setRole(value as Role)}
        >
          <MenuItem value={Role.Guardian}>{'Parent'}</MenuItem>
          <MenuItem value={Role.Student}>{'Student'}</MenuItem>
        </Select>
        <FormHelperText>{'Account Type'}</FormHelperText>
      </FormControl>
      <AuthenticationFormViaPhoneNumberWidget
        invalidInput={errors.phoneNumberDoesNotExists}
        submitForm={submitForm}
        phoneNumberErrorMessage="Phone number does not exists"
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
    </Box>
  );
};

export default AuthenticationViaPhoneNumber;
