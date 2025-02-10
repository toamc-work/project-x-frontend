import React, { FC, useContext } from 'react';

import { InvalidOtpException } from '@common/exceptions';
import { IVerificationCodeInput } from '@common/interfaces';
import { VerificationCodeInputWidget } from '@shared-ui/widgets';

import { SignupStudentErrorContext } from '../../dialogs/guardian-signup-student.component-dialog.tsx/context/GuardianSignupStudentErrorContextProvider.context';
import CompleteGuardianSignupStudent from '../../static/CompleteGuardianSignupStudent.component-static';
import GuardianSignupStudentForm from '../../widgets/forms/GuardianSignupStudentForm.component-widget';
import authService from '../../../providers/api/auth/auth.service';
import { GuardianSignupStudentSessionStartOtpSmsDto } from '../../../providers/api/auth/dto/guardian-signup-student-start-session-otp-via-sms.dto';
import { SignupStudentStepperSteps as StepsEnum } from '../../steppers/GuardianSignupStudentStepper.component-stepper';

interface SignupStudentProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  closeDialog: () => void;
  phone: string;
  name: string;
}

const SignupStudent: FC<SignupStudentProps> = ({
  activeStep,
  setActiveStep,
  closeDialog,
  phone,
  name,
}): React.JSX.Element => {
  const { errors, pubSub: errorPubSub$ } = useContext(
    SignupStudentErrorContext
  );

  const startGuardianSignupStudent = async (
    dto: GuardianSignupStudentSessionStartOtpSmsDto
  ) => {
    try {
      await authService.guardianSignupStudentSessionStartOtpSms(dto);
      setActiveStep(StepsEnum.Verify);
      errorPubSub$.publish('session-start');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const resendGuardianSignupStudentCode = async () => {
    try {
      await authService.guardianSignupStudentSessionResendOtpSms();
      errorPubSub$.publish('session-restart');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const verifyGuardianSignupStudentCode = async (
    dto: IVerificationCodeInput
  ) => {
    try {
      const response = await authService.guardianSignupStudentSessionVerifyOtp(
        dto
      );
      if (response.data.verification === 'granted') {
        setActiveStep(StepsEnum.Complete);
        errorPubSub$.publish('session-verified');
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
      errorPubSub$.publish('session-completed');
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
        <VerificationCodeInputWidget
          resendVerificationCode={resendGuardianSignupStudentCode}
          submitVerificationCode={verifyGuardianSignupStudentCode}
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
        <CompleteGuardianSignupStudent
          submitGuardianSignupStudentComplete={completeGuardianSignupStudent}
          handleContinue={closeDialog}
        />
      );
    default:
      return <div />;
  }
};

export default SignupStudent;
