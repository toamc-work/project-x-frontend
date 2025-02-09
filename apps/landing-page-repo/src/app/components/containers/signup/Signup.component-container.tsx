import React, { FC, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { InvalidOtpException } from '@common/exceptions';
import CompleteSignup from '../../../components/static/CompleteSignup.component-static';
import SignupFormWidget from '../../widgets/forms/SignupForm.component-widget';
import { VerificationCodeInputWidget } from '@shared-ui/widgets';
import authService from '../../../providers/api/auth/auth.service';
import { GuardianSignupSessionStartOtpSmsDto } from '../../../providers/api/auth/dto/guardian-signup-session-start-otp-sms.dto';
import { SignupErrorContext } from '../../pages/signup/context/SignupErrorContextProvider.context';
import { VerifyOtpDto } from '../../../providers/api/auth/dto/verify-otp.dto';

type SignupProps = unknown;

const Signup: FC<SignupProps> = (_props): React.JSX.Element => {
  const navigate = useNavigate();
  const { errors, pubSub: errorPubSub$ } = useContext(SignupErrorContext);

  const handleFormSubmission = async (
    dto: GuardianSignupSessionStartOtpSmsDto
  ) => {
    try {
      await authService.guardianSignupSessionStartOtpSms(dto);
      errorPubSub$.publish('session-start');
      navigate('verify', { relative: 'path' });
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      await authService.guardianSignupSessionResendOtpSms();
      errorPubSub$.publish('session-restart');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleVerifyVerificationCode = async (dto: VerifyOtpDto) => {
    try {
      const {
        data: { verification },
      } = await authService.guardianSignupSessionVerifyOtp(dto);
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

  const handleSignupSessionComplete = async () => {
    try {
      await authService.guardianSignupSessionComplete();
      errorPubSub$.publish('session-completed');
      navigate('/auth/signin', { replace: true });
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  return (
    <Routes>
      <Route
        index
        element={
          <SignupFormWidget
            invalidInput={errors.phoneNumberExists}
            submitForm={handleFormSubmission}
          />
        }
      />
      <Route
        path="verify"
        element={
          <VerificationCodeInputWidget
            submitVerificationCode={handleVerifyVerificationCode}
            resendVerificationCode={handleResendVerificationCode}
            error={errors.invalidOtp}
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
          <CompleteSignup submitSignupComplete={handleSignupSessionComplete} />
        }
      />
    </Routes>
  );
};

export default Signup;
