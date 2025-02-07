import React, { FC, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { InvalidOtpException } from "src/common/errors/exceptions/custom.exception";
import CompleteGuardianSignup from "src/components/static/CompleteGuardianSignup.component-static";
import SignupFormWidget from "src/components/widgets/forms/SignupForm.component-widget";
import VerificationCodeInput from "src/components/widgets/inputs/VerificationCodeInput.component-widget";
import authService from "src/providers/api/auth/auth.service";
import { GuardianSignupSessionStartOtpSmsDto } from "src/providers/api/auth/dto/guardian-signup-session-start-otp-sms.dto";
import { VerifyOtpDto } from "src/providers/api/auth/dto/verify-otp.dto";
import { GuardianSignupErrorContext } from "src/components/pages/guest/signup/context/GuardianSignupErrorContextProvider.context";

type SignupGuardianProps = unknown;

const SignupGuardian: FC<SignupGuardianProps> = (_props): React.JSX.Element => {
  const navigate = useNavigate();
  const { errors, pubSub: errorPubSub$ } = useContext(
    GuardianSignupErrorContext,
  );

  const handleFormSubmission = async (
    dto: GuardianSignupSessionStartOtpSmsDto,
  ) => {
    try {
      await authService.guardianSignupSessionStartOtpSms(dto);
      errorPubSub$.publish("session-start");
      navigate("verify", { relative: "path" });
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleResendVerificationCode = async () => {
    try {
      await authService.guardianSignupSessionResendOtpSms();
      errorPubSub$.publish("session-restart");
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleVerifyVerificationCode = async (dto: VerifyOtpDto) => {
    try {
      const {
        data: { verification },
      } = await authService.guardianSignupSessionVerifyOtp(dto);
      if (verification === "granted") {
        errorPubSub$.publish("session-verified");
        navigate("../complete", { relative: "path" });
      } else {
        errorPubSub$.throw(new InvalidOtpException("invalid otp"));
      }
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  const handleSignupSessionComplete = async () => {
    try {
      await authService.guardianSignupSessionComplete();
      errorPubSub$.publish("session-completed");
      navigate("/auth/signin", { replace: true });
    } catch (error) {
      errorPubSub$.throw(error);
    }
  };

  return (
    <Routes>
      <Route
        index
        element={
          <SignupFormWidget
            invalidInput={errors.phoneNumberExists}
            submitForm={handleFormSubmission}
          />
        }
      />
      <Route
        path="verify"
        element={
          <VerificationCodeInput
            submitVerificationCode={handleVerifyVerificationCode}
            resendVerificationCode={handleResendVerificationCode}
            invalidOtp={errors.invalidOtp}
          />
        }
      />
      <Route
        path="complete"
        element={
          <CompleteGuardianSignup
            submitSignupComplete={handleSignupSessionComplete}
          />
        }
      />
    </Routes>
  );
};

export default SignupGuardian;
