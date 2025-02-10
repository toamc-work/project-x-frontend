import React, { FC, useContext } from 'react';

import { InvalidOtpException } from '@common/exceptions';
import { IVerificationCodeInput } from '@common/interfaces';
import { VerificationCodeInputWidget } from '@shared-ui';

import authService from '../../../providers/api/auth/auth.service';
import { GuardianChangePhoneStepperSteps as StepEnum } from '../../steppers/GuardianChangePhoneStepper.component-stepper';
import { GuardianChangePhoneSessionStartOtpViaMailDto } from '../../../providers/api/auth/dto/guardian-change-phone-session-start-otp-via-mail.dto';
import GuardianChangePhoneForm from '../../widgets/forms/GuardianChangePhoneForm.component-widget';
import MidGuardianChangePhone from '../../static/MidGuardianChangePhone.component-static';
import CompleteGuardianChangePhone from '../../static/CompleteGuardianChangePhone.component-static';
import { GuardianChangePhoneErrorContext } from '../../dialogs/guardian-change-phone/context/GuardianChangePhoneErrorContextProvider.context';

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
    GuardianChangePhoneErrorContext
  );
  const startGuardianChangePhoneViaMail = async (
    dto: GuardianChangePhoneSessionStartOtpViaMailDto
  ) => {
    try {
      await authService.guardianChangePhoneSessionStartOtpMail(dto);
      errorPubSub$.publish('session-start-mail');
      setActiveStep(StepEnum.EnterCode);
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const resendGuardianChangePhoneCodeOtpMail = async () => {
    try {
      await authService.guardianChangePhoneSessionResendOtpMail();
      errorPubSub$.publish('session-restart');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const verifyGuardianChangePhoneCode = async (dto: IVerificationCodeInput) => {
    try {
      const response = await authService.guardianChangePhoneSessionVerifyOtp(
        dto
      );
      if (response.data.verification === 'granted') {
        errorPubSub$.publish('session-verified');
        setActiveStep(StepEnum.Signin);
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
      errorPubSub$.publish('session-completed-mail-start-sms');
      setActiveStep(StepEnum.VerifyPhone);
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const resendGuardianChangePhoneCodeOtpSms = async () => {
    try {
      await authService.guardianChangePhoneSessionResendOtpSms();
      errorPubSub$.publish('session-restart');
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };
  const completeGuardianChangePhone = async () => {
    try {
      await authService.guardianChangePhoneSessionComplete();
      errorPubSub$.publish('session-completed');
      setActiveStep(StepEnum.Complete);
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
        <VerificationCodeInputWidget
          resendVerificationCode={resendGuardianChangePhoneCodeOtpMail}
          submitVerificationCode={verifyGuardianChangePhoneCode}
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
        <MidGuardianChangePhone
          submitGuardianChangePhoneCompleteOtpSms={
            completeGuardianChangePhoneStartOtpSms
          }
        />
      );
    case 3:
      return (
        <VerificationCodeInputWidget
          resendVerificationCode={resendGuardianChangePhoneCodeOtpSms}
          submitVerificationCode={verifyGuardianChangePhoneCode}
          error={errors.invalidOtp}
          message={
            errors.invalidOtp
              ? 'Invalid verification code'
              : 'Please enter verification code'
          }
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
      return <div />;
  }
};

export default GuardianChangePhone;
