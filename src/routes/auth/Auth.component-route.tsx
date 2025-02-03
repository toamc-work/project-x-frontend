import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import SignupGuardian from "src/components/containers/signup-guardian/SignupGuardian.component-container";
import { AuthenticationViaPhoneNumberErrorContextProvider } from "./context/AuthenticationViaPhoneNumberErrorContextProvider.context";
import AuthenticationViaPhoneNumber from "src/components/containers/authentication-via-phone-number/AuthenticationViaPhoneNumber.component-container";
import { GuardianSignupErrorContextProvider } from "./context/GuardianSignupErrorContextProvider.context";

type AuthRouteProps = unknown;

const AuthRoute: FC<AuthRouteProps> = (_props): React.JSX.Element => {
  return (
    <Routes>
      <Route
        path="signup/*"
        element={
          <GuardianSignupErrorContextProvider>
            <SignupGuardian />
          </GuardianSignupErrorContextProvider>
        }
      />
      <Route
        path="signin/*"
        element={
          <AuthenticationViaPhoneNumberErrorContextProvider>
            <AuthenticationViaPhoneNumber />
          </AuthenticationViaPhoneNumberErrorContextProvider>
        }
      />
    </Routes>
  );
};

export default AuthRoute;
