import React, { FC, useContext } from 'react';
import { InvalidOtpException } from '@common/exceptions';
import { VerifyGuardianEmailErrorContext } from '../../dialogs/verify-guardian-email/context/VerifyGuardianEmailErrorContextProvider';
import CompleteEmailVerification from '../../static/CompleteEmailVerification.component-static';
import StartEmailVerification from '../../static/StartEmailVerification.component-static';
import { VerificationCodeInputWidget } from '@shared-ui/widgets';
import authService from '../../../providers/api/auth/auth.service';
import { VerifyOtpDto } from '../../../providers/api/auth/dto/verify-otp.dto';

interface EmailVerificationProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  closeDialog: () => void;
  email: string;
}

const EmailVerification: FC<EmailVerificationProps> = ({
  email,
  activeStep,
  setActiveStep,
  closeDialog,
}): React.JSX.Element => {
  const { errors, pubSub: errorPubSub$ } = useContext(
    VerifyGuardianEmailErrorContext
  );

  const startEmailVerification = async () => {
    await authService.guardianVerifyMailSessionStartOtp();
    errorPubSub$.publish('session-start');
    setActiveStep(1);
  };

  const resendEmailVerificationCode = async () => {
    try {
      await authService.guardianVerifyMailSessionResendOtp();
      errorPubSub$.publish('session-restart');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const verifyVerificationCode = async (dto: VerifyOtpDto) => {
    try {
      const response = await authService.guardianVerifyMailSessionVerifyOtp(
        dto
      );
      if (response.data.verification === 'granted') {
        errorPubSub$.publish('session-verified');
        setActiveStep(2);
      } else {
        errorPubSub$.throw(new InvalidOtpException());
      }
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const completeEmailVerification = async () => {
    try {
      await authService.guardianVerifyMailSessionComplete();
      errorPubSub$.publish('session-completed');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  switch (activeStep) {
    case 0:
      return (
        <StartEmailVerification
          email={email}
          sendVerificationCode={startEmailVerification}
        />
      );
    case 1:
      return (
        <VerificationCodeInputWidget
          resendVerificationCode={resendEmailVerificationCode}
          submitVerificationCode={verifyVerificationCode}
          error={errors.invalidOtp}
          message={
            errors.invalidOtp
              ? 'Invalid verification code'
              : 'Please enter verification code'
          }
        />
      );
    case 2:
      return (
        <CompleteEmailVerification
          submitEmailVerificationComplete={completeEmailVerification}
          handleContinue={closeDialog}
        />
      );
    default:
      return <div />;
  }
};

export default EmailVerification;
