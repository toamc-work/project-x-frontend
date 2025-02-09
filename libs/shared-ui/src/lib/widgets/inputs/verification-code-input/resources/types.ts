export interface Props {
  submitVerificationCode: (dto: { code: string }) => Promise<void>;
  resendVerificationCode: () => Promise<void>;
  error: boolean;
  message: string;
}
