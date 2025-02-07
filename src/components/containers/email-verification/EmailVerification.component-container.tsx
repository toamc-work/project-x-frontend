import React, { FC, useContext } from "react";
import { InvalidOtpException } from "src/common/errors/exceptions/custom.exception";
import { VerifyGuardianEmailErrorContext } from "src/components/dialogs/verify-guardian-email/context/VerifyGuardianEmailErrorContextProvider";
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
  const { errors, pubSub: errorPubSub$ } = useContext(
    VerifyGuardianEmailErrorContext,
  );

  const startEmailVerification = async () => {
    try {
      await authService.guardianVerifyMailSessionStartOtp();
      errorPubSub$.publish("session-start");
      setActiveStep(1);
    } catch (error) {
      throw error;
    }
  };

  const resendEmailVerificationCode = async () => {
    try {
      await authService.guardianVerifyMailSessionResendOtp();
      errorPubSub$.publish("session-restart");
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const verifyVerificationCode = async (dto: VerifyOtpDto) => {
    try {
      const response =
        await authService.guardianVerifyMailSessionVerifyOtp(dto);
      if (response.data.verification === "granted") {
        errorPubSub$.publish("session-verified");
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
      errorPubSub$.publish("session-completed");
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
        <VerificationCodeInput
          invalidOtp={errors.invalidOtp}
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
