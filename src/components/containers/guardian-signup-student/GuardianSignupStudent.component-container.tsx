import React, { FC, useContext } from "react";
import { InvalidOtpException } from "src/common/errors/exceptions/custom.exception";
import { GuardianSignupStudentErrorContext } from "src/components/dialogs/guardian-signup-student.component-dialog.tsx/context/GuardianSignupStudentErrorContextProvider.context";
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
  const { errors, pubSub: errorPubSub$ } = useContext(
    GuardianSignupStudentErrorContext,
  );

  const startGuardianSignupStudent = async (
    dto: GuardianSignupStudentSessionStartOtpSmsDto,
  ) => {
    try {
      await authService.guardianSignupStudentSessionStartOtpSms(dto);
      setActiveStep(1);
      errorPubSub$.publish("session-start");
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const resendGuardianSignupStudentCode = async () => {
    try {
      await authService.guardianSignupStudentSessionResendOtpSms();
      errorPubSub$.publish("session-restart");
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const verifyGuardianSignupStudentCode = async (dto: VerifyOtpDto) => {
    try {
      const response =
        await authService.guardianSignupStudentSessionVerifyOtp(dto);
      if (response.data.verification === "granted") {
        setActiveStep(2);
        errorPubSub$.publish("session-verified");
      } else {
        errorPubSub$.throw(new InvalidOtpException());
      }
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const completeGuardianSignupStudent = async () => {
    try {
      await authService.guardianSignupStudentSessionComplete();
      errorPubSub$.publish("session-completed");
    } catch (error) {
      errorPubSub$.throw(error);
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
          invalidOtp={errors.invalidOtp}
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
