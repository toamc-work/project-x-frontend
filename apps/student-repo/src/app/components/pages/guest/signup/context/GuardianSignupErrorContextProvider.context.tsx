import React, { createContext, useState } from 'react';
import {
  BadRequestException,
  ForbiddenException,
  GoneException,
  InternalServerException,
  UnhandledException,
} from '../../../../../common/errors/exceptions/common.exception';
import { InvalidOtpException } from '../../../../../common/errors/exceptions/custom.exception';
import {
  IPubSub,
  useSubjectObservable,
} from '../../../../../hooks/useSubjectObservable';

type IPubSubState =
  | 'session-start'
  | 'session-restart'
  | 'session-verified'
  | 'session-completed'
  | 'session-refreshed';

type GuardianSignupErrorContextProviderProps = {
  children: React.JSX.Element;
};

interface IState {
  phoneNumberExists: boolean;
  invalidOtp: boolean;
  serverError: boolean;
  unhandledError: boolean;
  sessionExpired: boolean;
}

type GuardianSignupErrorContextType = {
  errors: IState;
  pubSub: IPubSub<IPubSubState>;
};

export const GuardianSignupErrorContext = createContext(
  {} as GuardianSignupErrorContextType
);

export const GuardianSignupErrorContextProvider = ({
  children,
}: GuardianSignupErrorContextProviderProps) => {
  const [errors, setErrors] = useState<IState>({
    phoneNumberExists: false,
    invalidOtp: false,
    serverError: false,
    unhandledError: false,
    sessionExpired: false,
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
          phoneNumberExists: false,
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
        handler('phoneNumberExists', true);
        const timeout = setTimeout(() => {
          handler('phoneNumberExists', false);
        }, 2000);

        timeouts.push(timeout);
      } else if (err instanceof InvalidOtpException) {
        handler('invalidOtp', true);
      } else if (
        err instanceof GoneException ||
        err instanceof ForbiddenException
      ) {
        handler('sessionExpired', true);
      } else if (err instanceof InternalServerException) {
        handler('serverError', true);
        const timeout = setTimeout(() => {
          handler('serverError', false);
        }, 2000);

        timeouts.push(timeout);
      } else if (err instanceof UnhandledException) {
        handler('unhandledError', true);
        const timeout = setTimeout(() => {
          handler('unhandledError', false);
        }, 2000);

        timeouts.push(timeout);
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
    <GuardianSignupErrorContext.Provider value={{ errors, pubSub: pubSub }}>
      {children}
    </GuardianSignupErrorContext.Provider>
  );
};
