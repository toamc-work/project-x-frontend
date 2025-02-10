import React, { FC } from 'react';
import { AuthenticationViaPhoneNumberErrorContextProvider } from './context/AuthenticationViaPhoneNumberErrorContextProvider.context';
import AuthenticationViaPhoneNumber from '../../containers/authentication-via-phone-number/AuthenticationViaPhoneNumber.component-container';

type SigninPageProps = unknown;

const SigninPage: FC<SigninPageProps> = (_props): React.JSX.Element => {
  return (
    <AuthenticationViaPhoneNumberErrorContextProvider>
      <AuthenticationViaPhoneNumber />
    </AuthenticationViaPhoneNumberErrorContextProvider>
  );
};

export default SigninPage;
