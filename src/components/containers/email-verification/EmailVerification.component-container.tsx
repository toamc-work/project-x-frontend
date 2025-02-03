import React, { FC } from "react";
import CompleteEmailVerification from "src/components/static/CompleteEmailVerification.component-static";
import StartEmailVerification from "src/components/static/StartEmailVerification.component-static";
import VerificationCodeInput from "src/components/widgets/inputs/VerificationCodeInput.component-widget";
import authService from "src/providers/api/auth/auth.service";
import { VerifyOtpDto } from "src/providers/api/auth/dto/verify-otp.dto";

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
  const startEmailVerification = async () => {
    try {
      await authService.guardianVerifyMailSessionStartOtp();
      setActiveStep(1);
    } catch (error) {
      throw error;
    }
  };

  const resendEmailVerificationCode = async () => {
    try {
      await authService.guardianVerifyMailSessionResendOtp();
    } catch (error) {
      throw error;
    }
  };

  const verifyVerificationCode = async (dto: VerifyOtpDto) => {
    try {
      await authService.guardianVerifyMailSessionVerifyOtp(dto);
      setActiveStep(2);
    } catch (error) {
      throw error;
    }
  };

  const completeEmailVerification = async () => {
    try {
      await authService.guardianVerifyMailSessionComplete();
    } catch (error) {
      throw error;
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
        <VerificationCodeInput
          invalidOtp={false}
          resendVerificationCode={resendEmailVerificationCode}
          submitVerificationCode={verifyVerificationCode}
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
      return <></>;
  }
};

export default EmailVerification;
