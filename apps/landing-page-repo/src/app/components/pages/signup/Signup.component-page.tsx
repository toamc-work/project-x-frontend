import React, { FC } from 'react';
import { SignupErrorContextProvider } from './context/SignupErrorContextProvider.context';
import Signup from '../../containers/signup/Signup.component-container';

type SignupPageProps = unknown;

const SignupPage: FC<SignupPageProps> = (_props): React.JSX.Element => {
  return (
    <SignupErrorContextProvider>
      <Signup />
    </SignupErrorContextProvider>
  );
};

export default SignupPage;
