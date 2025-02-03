import React, { FC } from "react";
import authService from "src/providers/api/auth/auth.service";
import VerificationCodeInput from "src/components/widgets/inputs/VerificationCodeInput.component-widget";
import CompleteStudentClaim from "src/components/static/CompleteStudentClaim.component-static";
import AuthenticationFormViaPhoneNumberWidget from "src/components/widgets/forms/AuthenticationFormViaPhoneNumber.component-widget";
import { VerifyOtpDto } from "src/providers/api/auth/dto/verify-otp.dto";
import { AuthenticationStartSessionOtpViaSmsDto } from "src/providers/api/auth/dto/authentication-start-session-otp-via-sms.dto";

interface StudentClaimProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  closeDialog: () => void;
  phone: string;
}

const StudentClaim: FC<StudentClaimProps> = ({
  //phone,
  activeStep,
  setActiveStep,
  closeDialog,
}): React.JSX.Element => {
  const startStudentClaim = async (
    dto: AuthenticationStartSessionOtpViaSmsDto,
  ) => {
    try {
      await authService.guardianClaimStudentSessionStartOtpSms(dto);
      setActiveStep(1);
    } catch (error) {
      throw error;
    }
  };

  const resendStudentClaimCode = async () => {
    try {
      await authService.guardianClaimStudentSessionResendOtpSms();
    } catch (error) {
      throw error;
    }
  };

  const verifyStudentClaimCode = async (dto: VerifyOtpDto) => {
    try {
      await authService.guardianClaimStudentSessionVerifyOtp(dto);
      setActiveStep(2);
    } catch (error) {
      throw error;
    }
  };

  const completeStudentClaim = async () => {
    try {
      await authService.guardianClaimStudentSessionComplete();
    } catch (error) {
      throw error;
    }
  };

  switch (activeStep) {
    case 0:
      return (
        <AuthenticationFormViaPhoneNumberWidget
          btnTxt="Send Verification Code"
          submitForm={startStudentClaim}
        />
      );
    case 1:
      return (
        <VerificationCodeInput
          invalidOtp={false}
          resendVerificationCode={resendStudentClaimCode}
          submitVerificationCode={verifyStudentClaimCode}
        />
      );
    case 2:
      return (
        <CompleteStudentClaim
          submitStudentClaimComplete={completeStudentClaim}
          handleContinue={closeDialog}
        />
      );
    default:
      return <></>;
  }
};

export default StudentClaim;
