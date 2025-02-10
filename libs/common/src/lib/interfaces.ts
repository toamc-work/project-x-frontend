export interface IVerificationCodeInput {
  code: string;
}

export interface IVerificationCodeResponse {
  verification: 'granted' | 'denied';
}
