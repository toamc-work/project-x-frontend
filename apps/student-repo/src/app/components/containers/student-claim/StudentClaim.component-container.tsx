import React, { FC, useContext } from 'react';
import authService from '../../../providers/api/auth/auth.service';
import VerificationCodeInput from '../../../components/widgets/inputs/VerificationCodeInput.component-widget';
import CompleteStudentClaim from '../../../components/static/CompleteStudentClaim.component-static';
import AuthenticationFormViaPhoneNumberWidget from '../../../components/widgets/forms/AuthenticationFormViaPhoneNumber.component-widget';
import { VerifyOtpDto } from '../../../providers/api/auth/dto/verify-otp.dto';
import { AuthenticationStartSessionOtpViaSmsDto } from '../../../providers/api/auth/dto/authentication-start-session-otp-via-sms.dto';
import { ClaimStudentErrorContext } from '../../dialogs/claim-student/context/ClaimStudentErrorContextProvider.context';
import { InvalidOtpException } from '../../../common/errors/exceptions/custom.exception';

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
          invalidInput={errors.inputWrong}
          btnTxt="Send Verification Code"
          submitForm={startStudentClaim}
        />
      );
    case 1:
      return (
        <VerificationCodeInput
          invalidOtp={errors.invalidOtp}
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
      return <div />;
  }
};

export default StudentClaim;
