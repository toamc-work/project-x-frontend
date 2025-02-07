import React, { FC, useContext } from "react";
import authService from "src/providers/api/auth/auth.service";
import { GuardianChangePhoneSessionStartOtpViaMailDto } from "src/providers/api/auth/dto/guardian-change-phone-session-start-otp-via-mail.dto";
import { VerifyOtpDto } from "src/providers/api/auth/dto/verify-otp.dto";
import GuardianChangePhoneForm from "src/components/widgets/forms/GuardianChangePhoneForm.component-widget";
import VerificationCodeInput from "src/components/widgets/inputs/VerificationCodeInput.component-widget";
import MidGuardianChangePhone from "src/components/static/MidGuardianChangePhone.component-static";
import CompleteGuardianChangePhone from "src/components/static/CompleteGuardianChangePhone.component-static";
import { GuardianChangePhoneErrorContext } from "src/components/dialogs/guardian-change-phone/context/GuardianChangePhoneErrorContextProvider.context";
import { InvalidOtpException } from "src/common/errors/exceptions/custom.exception";

interface GuardianChangePhoneProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  closeDialog: () => void;
  //isEmailVerified: boolean;
}

const GuardianChangePhone: FC<GuardianChangePhoneProps> = ({
  activeStep,
  setActiveStep,
  closeDialog,
  //isEmailVerified,
}): React.JSX.Element => {
  const { errors, pubSub: errorPubSub$ } = useContext(
    GuardianChangePhoneErrorContext,
  );
  const startGuardianChangePhoneViaMail = async (
    dto: GuardianChangePhoneSessionStartOtpViaMailDto,
  ) => {
    try {
      await authService.guardianChangePhoneSessionStartOtpMail(dto);
      errorPubSub$.publish("session-start-mail");
      setActiveStep(1);
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const resendGuardianChangePhoneCodeOtpMail = async () => {
    try {
      await authService.guardianChangePhoneSessionResendOtpMail();
      errorPubSub$.publish("session-restart");
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const verifyGuardianChangePhoneCode = async (dto: VerifyOtpDto) => {
    try {
      const response =
        await authService.guardianChangePhoneSessionVerifyOtp(dto);
      if (response.data.verification === "granted") {
        errorPubSub$.publish("session-verified");
        setActiveStep(activeStep + 1);
      } else {
        errorPubSub$.throw(new InvalidOtpException());
      }
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const completeGuardianChangePhoneStartOtpSms = async () => {
    try {
      await authService.guardianChangePhoneSessionCompleteStartOtpSms();
      errorPubSub$.publish("session-completed-mail-start-sms");
      setActiveStep(3);
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const resendGuardianChangePhoneCodeOtpSms = async () => {
    try {
      await authService.guardianChangePhoneSessionResendOtpSms();
      errorPubSub$.publish("session-restart");
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const completeGuardianChangePhone = async () => {
    try {
      await authService.guardianChangePhoneSessionComplete();
      errorPubSub$.publish("session-completed");
      setActiveStep(4);
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  switch (activeStep) {
    case 0:
      return (
        <GuardianChangePhoneForm
          isEmailVerified={!errors.mailNotVerified}
          phoneAlreadyExists={errors.phoneAlreadyExists}
          invalidCredentials={errors.inputWrong}
          submitForm={startGuardianChangePhoneViaMail}
        />
      );
    case 1:
      return (
        <VerificationCodeInput
          invalidOtp={errors.invalidOtp}
          resendVerificationCode={resendGuardianChangePhoneCodeOtpMail}
          submitVerificationCode={verifyGuardianChangePhoneCode}
        />
      );
    case 2:
      return (
        <MidGuardianChangePhone
          submitGuardianChangePhoneCompleteOtpSms={
            completeGuardianChangePhoneStartOtpSms
          }
        />
      );
    case 3:
      return (
        <VerificationCodeInput
          invalidOtp={errors.invalidOtp}
          resendVerificationCode={resendGuardianChangePhoneCodeOtpSms}
          submitVerificationCode={verifyGuardianChangePhoneCode}
        />
      );
    case 4:
      return (
        <CompleteGuardianChangePhone
          submitGuardianChangePhoneComplete={completeGuardianChangePhone}
          handleContinue={closeDialog}
        />
      );
    default:
      return <></>;
  }
};

export default GuardianChangePhone;
