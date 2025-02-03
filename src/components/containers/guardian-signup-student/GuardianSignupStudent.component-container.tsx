import React, { FC } from "react";
import CompleteGuardianSignupStudent from "src/components/static/CompleteGuardianSignupStudent.component-static";
import GuardianSignupStudentForm from "src/components/widgets/forms/GuardianSignupStudentForm.component-widget";
import VerificationCodeInput from "src/components/widgets/inputs/VerificationCodeInput.component-widget";
import authService from "src/providers/api/auth/auth.service";
import { GuardianSignupStudentSessionStartOtpSmsDto } from "src/providers/api/auth/dto/guardian-signup-student-start-session-otp-via-sms.dto";
import { VerifyOtpDto } from "src/providers/api/auth/dto/verify-otp.dto";

interface GuardianSignupStudentProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  closeDialog: () => void;
  phone: string;
  name: string;
}

const GuardianSignupStudent: FC<GuardianSignupStudentProps> = ({
  activeStep,
  setActiveStep,
  closeDialog,
  phone,
  name,
}): React.JSX.Element => {
  const startGuardianSignupStudent = async (
    dto: GuardianSignupStudentSessionStartOtpSmsDto,
  ) => {
    try {
      await authService.guardianSignupStudentSessionStartOtpSms(dto);
      setActiveStep(1);
    } catch (error) {
      throw error;
    }
  };
  const resendGuardianSignupStudentCode = async () => {
    try {
      await authService.guardianSignupStudentSessionResendOtpSms();
    } catch (error) {
      throw error;
    }
  };
  const verifyGuardianSignupStudentCode = async (dto: VerifyOtpDto) => {
    try {
      await authService.guardianSignupStudentSessionVerifyOtp(dto);
      setActiveStep(2);
    } catch (error) {
      throw error;
    }
  };
  const completeGuardianSignupStudent = async () => {
    try {
      await authService.guardianSignupStudentSessionComplete();
    } catch (error) {
      throw error;
    }
  };

  switch (activeStep) {
    case 0:
      return (
        <GuardianSignupStudentForm
          phone={phone}
          name={name}
          submitForm={startGuardianSignupStudent}
        />
      );
    case 1:
      return (
        <VerificationCodeInput
          invalidOtp={false}
          resendVerificationCode={resendGuardianSignupStudentCode}
          submitVerificationCode={verifyGuardianSignupStudentCode}
        />
      );
    case 2:
      return (
        <CompleteGuardianSignupStudent
          submitGuardianSignupStudentComplete={completeGuardianSignupStudent}
          handleContinue={closeDialog}
        />
      );
    default:
      return <></>;
  }
};

export default GuardianSignupStudent;
