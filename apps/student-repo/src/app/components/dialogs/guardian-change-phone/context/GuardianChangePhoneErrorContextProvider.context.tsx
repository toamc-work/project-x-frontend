import React, { createContext, useState } from 'react';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  InternalServerException,
  IsntVerifiedException,
  TooManyRequestsException,
  UnauthorizedException,
  UnhandledException,
} from '../../../../common/errors/exceptions/common.exception';
import { InvalidOtpException } from '../../../../common/errors/exceptions/custom.exception';
import {
  IPubSub,
  useSubjectObservable,
} from '../../../../hooks/useSubjectObservable';

type IPubSubState =
  | 'session-start-mail'
  | 'session-restart'
  | 'session-verified'
  | 'session-completed-mail-start-sms'
  | 'session-completed';

type GuardianChangePhoneErrorContextProviderProps = {
  children: React.JSX.Element;
};

interface IState {
  inputWrong: boolean;
  phoneAlreadyExists: boolean;
  mailNotVerified: boolean;
  invalidToken: boolean;
  invalidOtp: boolean;
  serverError: boolean;
  unhandledError: boolean;
  sessionExpired: boolean;
  tooManyRequest: boolean;
}
type GuardianChangePhoneErrorContextType = {
  errors: IState;
  pubSub: IPubSub<IPubSubState>;
};

export const GuardianChangePhoneErrorContext = createContext(
  {} as GuardianChangePhoneErrorContextType
);

export const GuardianChangePhoneErrorContextProvider = ({
  children,
}: GuardianChangePhoneErrorContextProviderProps) => {
  const [errors, setErrors] = useState<IState>({
    inputWrong: false,
    phoneAlreadyExists: false,
    mailNotVerified: false,
    invalidToken: false,
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
      if (value === 'session-start-mail') {
        setErrors({
          ...errors,
          inputWrong: false,
          phoneAlreadyExists: false,
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
      } else if (value === 'session-completed-mail-start-sms') {
        setErrors({
          ...errors,
          sessionExpired: false,
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
        handler('inputWrong', true);
        const timeout = setTimeout(() => {
          handler('inputWrong', false);
        }, 2000);
        timeouts.push(timeout);
      } else if (err instanceof UnauthorizedException) {
        handler('invalidToken', true);
        const timeout = setTimeout(() => {
          handler('invalidToken', false);
        }, 2000);
        timeouts.push(timeout);
      } else if (err instanceof IsntVerifiedException) {
        handler('mailNotVerified', true);
        const timeout = setTimeout(() => {
          handler('mailNotVerified', false);
        }, 8000);
        timeouts.push(timeout);
      } else if (err instanceof ConflictException) {
        handler('phoneAlreadyExists', true);
        const timeout = setTimeout(() => {
          handler('phoneAlreadyExists', false);
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
    <GuardianChangePhoneErrorContext.Provider
      value={{ errors, pubSub: pubSub }}
    >
      {children}
    </GuardianChangePhoneErrorContext.Provider>
  );
};
