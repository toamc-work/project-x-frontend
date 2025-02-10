import { IVerificationCodeInput } from '@common/interfaces';

export interface Props {
  submitVerificationCode: (dto: IVerificationCodeInput) => Promise<void>;
  resendVerificationCode: () => Promise<void>;
  error: boolean;
  message: string;
}
