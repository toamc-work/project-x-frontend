import React, { createContext, useState } from 'react';
import {
  BadRequestException,
  ForbiddenException,
  GoneException,
  InternalServerException,
  TooManyRequestsException,
  UnhandledException,
  InvalidOtpException,
} from '@common/exceptions';

import { IPubSub, useSubjectObservable } from '@shared-hooks';

type IPubSubState =
  | 'session-start'
  | 'session-restart'
  | 'session-verified'
  | 'session-completed'
  | 'session-refreshed';

type AuthenticationViaPhoneNumberErrorContextProviderProps = {
  children: React.JSX.Element;
};

interface IState {
  phoneNumberDoesNotExists: boolean;
  invalidOtp: boolean;
  serverError: boolean;
  unhandledError: boolean;
  sessionExpired: boolean;
  tooManyRequest: boolean;
}

type AuthenticationViaPhoneNumberErrorContextType = {
  errors: IState;
  pubSub: IPubSub<IPubSubState>;
};

export const AuthenticationViaPhoneNumberErrorContext = createContext(
  {} as AuthenticationViaPhoneNumberErrorContextType
);

export const AuthenticationViaPhoneNumberErrorContextProvider = ({
  children,
}: AuthenticationViaPhoneNumberErrorContextProviderProps) => {
  const [errors, setErrors] = useState<IState>({
    phoneNumberDoesNotExists: false,
    invalidOtp: false,
    serverError: false,
    unhandledError: false,
    sessionExpired: false,
    tooManyRequest: false,
  });

  const pubSub = useSubjectObservable<IPubSubState>();

  const handler = (key: keyof typeof errors, value: boolean) => {
    setErrors({
      ...errors,
      [key]: value,
    });
  };
  pubSub.subscribe({
    next(value) {
      if (value === 'session-start') {
        setErrors({
          ...errors,
          phoneNumberDoesNotExists: false,
          serverError: false,
          unhandledError: false,
        });
      } else if (value === 'session-restart' || value === 'session-verified') {
        setErrors({
          ...errors,
          invalidOtp: false,
          serverError: false,
          unhandledError: false,
        });
      } else if (value === 'session-completed') {
        const state = Object.assign(errors, {});

        for (const error in state) {
          state[error as keyof typeof state] = false;
        }

        setErrors(state);
      }
    },
    error(err) {
      let timeouts: NodeJS.Timeout[] = [];
      if (err instanceof BadRequestException) {
        handler('phoneNumberDoesNotExists', true);
        const timeout = setTimeout(() => {
          handler('phoneNumberDoesNotExists', false);
        }, 2000);

        timeouts.push(timeout);
      } else if (err instanceof InvalidOtpException) {
        handler('invalidOtp', true);
      } else if (
        err instanceof GoneException ||
        err instanceof ForbiddenException
      ) {
        handler('sessionExpired', true);
      } else if (err instanceof TooManyRequestsException) {
        handler('tooManyRequest', true);
        const timeout = setTimeout(() => {
          handler('tooManyRequest', false);
        }, 30000);

        timeouts.push(timeout);
      } else if (err instanceof InternalServerException) {
        handler('serverError', true);
      } else if (err instanceof UnhandledException) {
        handler('unhandledError', true);
      }

      return () => {
        if (timeouts.length) {
          timeouts.forEach((timeout) => {
            clearTimeout(timeout);
          });

          timeouts = [];
        }
      };
    },
    complete() {
      return;
    },
  });

  return (
    <AuthenticationViaPhoneNumberErrorContext.Provider
      value={{ errors, pubSub: pubSub }}
    >
      {children}
    </AuthenticationViaPhoneNumberErrorContext.Provider>
  );
};
