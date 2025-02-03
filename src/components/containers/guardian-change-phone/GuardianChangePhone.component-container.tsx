import React, { FC } from "react";
import authService from "src/providers/api/auth/auth.service";
import { GuardianChangePhoneSessionStartOtpViaMailDto } from "src/providers/api/auth/dto/guardian-change-phone-session-start-otp-via-mail.dto";
import { VerifyOtpDto } from "src/providers/api/auth/dto/verify-otp.dto";
import GuardianChangePhoneForm from "src/components/widgets/forms/GuardianChangePhoneForm.component-widget";
import VerificationCodeInput from "src/components/widgets/inputs/VerificationCodeInput.component-widget";
import MidGuardianChangePhone from "src/components/static/MidGuardianChangePhone.component-static";
import CompleteGuardianChangePhone from "src/components/static/CompleteGuardianChangePhone.component-static";

interface GuardianChangePhoneProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  closeDialog: () => void;
  isEmailVerified: boolean;
}

const GuardianChangePhone: FC<GuardianChangePhoneProps> = ({
  activeStep,
  setActiveStep,
  closeDialog,
  isEmailVerified,
}): React.JSX.Element => {
  const startGuardianChangePhoneViaMail = async (
    dto: GuardianChangePhoneSessionStartOtpViaMailDto,
  ) => {
    try {
      await authService.guardianChangePhoneSessionStartOtpMail(dto);
      setActiveStep(1);
    } catch (error) {
      throw error;
    }
  };
  const resendGuardianChangePhoneCodeOtpMail = async () => {
    try {
      await authService.guardianChangePhoneSessionResendOtpMail();
    } catch (error) {
      throw error;
    }
  };
  const verifyGuardianChangePhoneCode = async (dto: VerifyOtpDto) => {
    try {
      await authService.guardianChangePhoneSessionVerifyOtp(dto);
      setActiveStep(activeStep + 1);
    } catch (error) {
      throw error;
    }
  };
  const completeGuardianChangePhoneStartOtpSms = async () => {
    try {
      await authService.guardianChangePhoneSessionCompleteStartOtpSms();
      setActiveStep(3);
    } catch (error) {
      throw error;
    }
  };
  const resendGuardianChangePhoneCodeOtpSms = async () => {
    try {
      await authService.guardianChangePhoneSessionResendOtpSms();
    } catch (error) {
      throw error;
    }
  };
  const completeGuardianChangePhone = async () => {
    try {
      await authService.guardianChangePhoneSessionComplete();
      setActiveStep(4);
    } catch (error) {
      throw error;
    }
  };
  switch (activeStep) {
    case 0:
      return (
        <GuardianChangePhoneForm
          isEmailVerified={isEmailVerified}
          submitForm={startGuardianChangePhoneViaMail}
        />
      );
    case 1:
      return (
        <VerificationCodeInput
          invalidOtp={false}
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
          invalidOtp={false}
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
