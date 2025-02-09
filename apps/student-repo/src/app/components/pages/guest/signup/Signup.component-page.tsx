import React, { FC } from 'react';
import { GuardianSignupErrorContextProvider } from './context/GuardianSignupErrorContextProvider.context';
import SignupGuardian from '../../../../components/containers/signup-guardian/SignupGuardian.component-container';

type SignupPageProps = unknown;

const SignupPage: FC<SignupPageProps> = (_props): React.JSX.Element => {
  return (
    <GuardianSignupErrorContextProvider>
      <SignupGuardian />
    </GuardianSignupErrorContextProvider>
  );
};

export default SignupPage;
