import React, { createContext, useState } from "react";
import {
  UnauthorizedException,
  ForbiddenException,
  GoneException,
  ConflictException,
  InternalServerException,
  TooManyRequestsException,
  UnhandledException,
} from "src/common/errors/exceptions/common.exception";
import { InvalidOtpException } from "src/common/errors/exceptions/custom.exception";
import { IPubSub, useSubjectObservable } from "src/hooks/useSubjectObservable";

type IPubSubState =
  | "session-start"
  | "session-restart"
  | "session-verified"
  | "session-completed";

type GuardianSignupStudentErrorContextProviderProps = {
  children: React.JSX.Element;
};

interface IState {
  phoneNumberAlreadyExists: boolean;
  tokenInvalid: boolean;
  invalidOtp: boolean;
  serverError: boolean;
  unhandledError: boolean;
  sessionExpired: boolean;
  tooManyRequest: boolean;
}

type GuardianSignupStudentErrorContextType = {
  errors: IState;
  pubSub: IPubSub<IPubSubState>;
};

export const GuardianSignupStudentErrorContext = createContext(
  {} as GuardianSignupStudentErrorContextType,
);

export const GuardianSignupStudentErrorContextProvider = ({
  children,
}: GuardianSignupStudentErrorContextProviderProps) => {
  const [errors, setErrors] = useState<IState>({
    phoneNumberAlreadyExists: false,
    tokenInvalid: false,
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
      if (value === "session-start") {
        setErrors({
          ...errors,
          phoneNumberAlreadyExists: false,
          tokenInvalid: false,
          serverError: false,
          unhandledError: false,
        });
      } else if (value === "session-restart" || value === "session-verified") {
        setErrors({
          ...errors,
          invalidOtp: false,
          serverError: false,
          unhandledError: false,
        });
      } else if (value === "session-completed") {
        const state = Object.assign(errors, {});

        for (const error in state) {
          state[error as keyof typeof state] = false;
        }

        setErrors(state);
      }
    },
    error(err) {
      let timeouts: NodeJS.Timeout[] = [];
      if (err instanceof UnauthorizedException) {
        handler("tokenInvalid", true);
        const timeout = setTimeout(() => {
          handler("tokenInvalid", false);
        }, 2000);

        timeouts.push(timeout);
      } else if (err instanceof ConflictException) {
        handler("phoneNumberAlreadyExists", true);
        const timeout = setTimeout(() => {
          handler("phoneNumberAlreadyExists", false);
        }, 2000);

        timeouts.push(timeout);
      } else if (err instanceof InvalidOtpException) {
        handler("invalidOtp", true);
      } else if (
        err instanceof GoneException ||
        err instanceof ForbiddenException
      ) {
        handler("sessionExpired", true);
      } else if (err instanceof TooManyRequestsException) {
        handler("tooManyRequest", true);
        const timeout = setTimeout(() => {
          handler("tooManyRequest", false);
        }, 30000);

        timeouts.push(timeout);
      } else if (err instanceof InternalServerException) {
        handler("serverError", true);
      } else if (err instanceof UnhandledException) {
        handler("unhandledError", true);
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
    complete() {},
  });

  return (
    <GuardianSignupStudentErrorContext.Provider
      value={{ errors, pubSub: pubSub }}
    >
      {children}
    </GuardianSignupStudentErrorContext.Provider>
  );
};
