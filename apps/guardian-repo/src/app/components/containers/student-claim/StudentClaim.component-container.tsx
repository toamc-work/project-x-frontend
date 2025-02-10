import React, { FC, useContext } from 'react';
import { InvalidOtpException } from '@common/exceptions';
import {
  AuthenticationFormViaPhoneNumberWidget,
  VerificationCodeInputWidget,
} from '@shared-ui/widgets';
import authService from '../../../providers/api/auth/auth.service';
import CompleteStudentClaim from '../../static/CompleteStudentClaim.component-static';
import { VerifyOtpDto } from '../../../providers/api/auth/dto/verify-otp.dto';
import { AuthenticationStartSessionOtpViaSmsDto } from '../../../providers/api/auth/dto/authentication-start-session-otp-via-sms.dto';
import { ClaimStudentErrorContext } from '../../dialogs/claim-student/context/ClaimStudentErrorContextProvider.context';

interface StudentClaimProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  closeDialog: () => void;
  phone: string;
}

const StudentClaim: FC<StudentClaimProps> = ({
  activeStep,
  setActiveStep,
  closeDialog,
}): React.JSX.Element => {
  const { errors, pubSub: errorPubSub$ } = useContext(ClaimStudentErrorContext);
  const startStudentClaim = async (
    dto: AuthenticationStartSessionOtpViaSmsDto
  ) => {
    try {
      await authService.guardianClaimStudentSessionStartOtpSms(dto);
      setActiveStep(1);
      errorPubSub$.publish('session-start');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const resendStudentClaimCode = async () => {
    try {
      await authService.guardianClaimStudentSessionResendOtpSms();
      errorPubSub$.publish('session-restart');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const verifyStudentClaimCode = async (dto: VerifyOtpDto) => {
    try {
      const response = await authService.guardianClaimStudentSessionVerifyOtp(
        dto
      );
      if (response.data.verification === 'granted') {
        setActiveStep(2);
        errorPubSub$.publish('session-verified');
      } else {
        errorPubSub$.throw(new InvalidOtpException());
      }
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const completeStudentClaim = async () => {
    try {
      await authService.guardianClaimStudentSessionComplete();
      errorPubSub$.publish('session-completed');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  switch (activeStep) {
    case 0:
      return (
        <AuthenticationFormViaPhoneNumberWidget
          regionCode="IL"
          btnTxt="Send Verification Code"
          submit={startStudentClaim}
          error={errors.inputWrong}
          message={
            errors.inputWrong ? 'Phone number does not exists' : undefined
          }
        />
      );
    case 1:
      return (
        <VerificationCodeInputWidget
          resendVerificationCode={resendStudentClaimCode}
          submitVerificationCode={verifyStudentClaimCode}
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
        <CompleteStudentClaim
          submitStudentClaimComplete={completeStudentClaim}
          handleContinue={closeDialog}
        />
      );
    default:
      return <div />;
  }
};

export default StudentClaim;
