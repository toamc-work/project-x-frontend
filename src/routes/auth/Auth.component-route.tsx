import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import SignupPage from "src/components/pages/guest/signup/Signup.component-page";
import SigninPage from "src/components/pages/guest/signin/Signin.component-page";

type AuthRouteProps = unknown;

const AuthRoute: FC<AuthRouteProps> = (_props): React.JSX.Element => {
  return (
    <Routes>
      <Route path="signup/*" element={<SignupPage />} />
      <Route path="signin/*" element={<SigninPage />} />
    </Routes>
  );
};

export default AuthRoute;
