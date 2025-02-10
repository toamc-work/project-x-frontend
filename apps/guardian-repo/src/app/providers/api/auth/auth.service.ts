import { Logger, HttpException } from '@factories';
import { paths } from './definitions/constants';
import { GuardianSignupSessionStartOtpSmsDto } from './dto/guardian-signup-session-start-otp-sms.dto';
import { AuthenticationStartSessionOtpViaSmsDto } from './dto/authentication-start-session-otp-via-sms.dto';
import { GuardianSignupStudentSessionStartOtpSmsDto } from './dto/guardian-signup-student-start-session-otp-via-sms.dto';
import {
  IVerificationCodeInput,
  IVerificationCodeResponse,
} from '@common/interfaces';

import httpRequest from '../http-request';
import { AxiosError, AxiosResponse } from 'axios';
import { GuardianChangePhoneSessionStartOtpViaMailDto } from './dto/guardian-change-phone-session-start-otp-via-mail.dto';

class AuthService {
  private readonly logger = new Logger(AuthService.name);
  /**
   * Sends an OTP via SMS to start the guardian signup session.
   *
   * @param dto - Input data required to send the OTP.
   * @returns The session-storage cookie from the API response.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSignupSessionStartOtpSms(
    dto: GuardianSignupSessionStartOtpSmsDto
  ) {
    try {
      const { guardianSignupSessionStartOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint,
        dto
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to restart the guardian signup session.
   *
   * @cookie session-storage
   * @returns The session-storage cookie from the API response.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSignupSessionResendOtpSms() {
    try {
      const { guardianSignupSessionResendOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Verifies the OTP to continue the guardian signup session.
   *
   * @cookie session-storage
   * @param dto - Input data required for OTP verification.
   * @returns The ticket-storage cookie from the API response if the verification is granted.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSignupSessionVerifyOtp(dto: IVerificationCodeInput) {
    try {
      const { guardianSignupSessionVerifyOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IVerificationCodeResponse>> =
        await httpRequest.post(endpoint, dto);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Completes the guardian signup session.
   *
   * @cookie ticket-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSignupSessionComplete() {
    try {
      const { guardianSignupSessionComplete: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to start the guardian signin session.
   *
   * @param dto - Input data required to send the OTP.
   * @returns The session-storage cookie from the API response.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSigninSessionStartOtpSms(
    dto: AuthenticationStartSessionOtpViaSmsDto
  ) {
    try {
      const { guardianSigninSessionStartOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint,
        dto
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to restart the guardian signin session.
   *
   * @cookie session-storage
   * @returns The session-storage cookie from the API response.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSigninSessionResendOtpSms() {
    try {
      const { guardianSigninSessionResendOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Verifies the OTP to continue the guardian signup session.
   *
   * @cookie session-storage
   * @param dto - Input data required for OTP verification.
   * @returns The ticket-storage cookie from the API response if the verification is granted.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSigninSessionVerifyOtp(dto: IVerificationCodeInput) {
    try {
      const { guardianSigninSessionVerifyOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IVerificationCodeResponse>> =
        await httpRequest.post(endpoint, dto);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Completes the guardian signup session.
   *
   * @cookie ticket-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSigninSessionComplete() {
    try {
      const { guardianSigninSessionComplete: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to start the student signin session.
   *
   * @param dto - Input data required to send the OTP.
   * @returns The session-storage cookie from the API response.
   * @throws HttpException if the API call fails or returns an error.
   */
  async studentSigninSessionStartOtpSms(
    dto: AuthenticationStartSessionOtpViaSmsDto
  ) {
    try {
      const { studentSigninSessionStartOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint,
        dto
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to restart the student signin session.
   *
   * @cookie session-storage
   * @returns The session-storage cookie from the API response.
   * @throws HttpException if the API call fails or returns an error.
   */
  async studentSigninSessionResendOtpSms() {
    try {
      const { studentSigninSessionResendOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Verifies the OTP to continue the guardian signup session.
   *
   * @cookie session-storage
   * @param dto - Input data required for OTP verification.
   * @returns The ticket-storage cookie from the API response if the verification is granted.
   * @throws HttpException if the API call fails or returns an error.
   */
  async studentSigninSessionVerifyOtp(dto: IVerificationCodeInput) {
    try {
      const { studentSigninSessionVerifyOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IVerificationCodeResponse>> =
        await httpRequest.post(endpoint, dto);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Completes the guardian signup session.
   *
   * @cookie ticket-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async studentSigninSessionComplete() {
    try {
      const { studentSigninSessionComplete: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via MAIL to start the guardian verify mail session.
   *
   * @cookie access-token
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianVerifyMailSessionStartOtp() {
    try {
      const { guardianVerifyMailSessionStartOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via MAIL to restart the guardian verify mail session.
   *
   * @cookie session-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianVerifyMailSessionResendOtp() {
    try {
      const { guardianVerifyMailSessionResendOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Verifies the OTP to continue the guardian verify mail session.
   *
   * @cookie session-storage
   * @param dto - Input data required for OTP verification.
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianVerifyMailSessionVerifyOtp(dto: IVerificationCodeInput) {
    try {
      const { guardianVerifyMailSessionVerifyOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IVerificationCodeResponse>> =
        await httpRequest.post(endpoint, dto);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Completes the guardian verify mail session.
   *
   * @cookie ticket-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianVerifyMailSessionComplete() {
    try {
      const { guardianVerifyMailSessionComplete: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to start the guardian student-signup session.
   *
   * @param dto - Input data required to send the OTP.\
   * @cookie session-storage
   * @returns The session-storage cookie from the API response.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSignupStudentSessionStartOtpSms(
    dto: GuardianSignupStudentSessionStartOtpSmsDto
  ) {
    try {
      const { guardianSignupStudentSessionStartOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint,
        dto
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to restart the guardian student-signup session.
   *
   * @cookie session-storage
   * @returns The session-storage cookie from the API response.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSignupStudentSessionResendOtpSms() {
    try {
      const { guardianSignupStudentSessionResendOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Verifies the OTP to continue the guardian student-signup session.
   *
   * @cookie session-storage
   * @param dto - Input data required for OTP verification.
   * @returns The ticket-storage cookie from the API response if the verification is granted.
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSignupStudentSessionVerifyOtp(dto: IVerificationCodeInput) {
    try {
      const { guardianSignupStudentSessionVerifyOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IVerificationCodeResponse>> =
        await httpRequest.post(endpoint, dto);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Completes the guardian student-signup session.
   *
   * @cookie ticket-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianSignupStudentSessionComplete() {
    try {
      const { guardianSignupStudentSessionComplete: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to start the student claim session.
   *
   * @cookie session-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianClaimStudentSessionStartOtpSms(
    dto: AuthenticationStartSessionOtpViaSmsDto
  ) {
    try {
      const { guardianClaimStudentSessionStartOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint,
        dto
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to restart the student claim session.
   *
   * @cookie session-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianClaimStudentSessionResendOtpSms() {
    try {
      const { guardianClaimStudentSessionResendOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Verifies the OTP to continue the student claim session.
   *
   * @cookie session-storage
   * @param dto - Input data required for OTP verification.
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianClaimStudentSessionVerifyOtp(dto: IVerificationCodeInput) {
    try {
      const { guardianClaimStudentSessionVerifyOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IVerificationCodeResponse>> =
        await httpRequest.post(endpoint, dto);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Completes the student claim session.
   *
   * @cookie ticket-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianClaimStudentSessionComplete() {
    try {
      const { guardianClaimStudentSessionComplete: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via MAIL to start the guardian change phone session.
   *
   * @cookie access-token
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianChangePhoneSessionStartOtpMail(
    dto: GuardianChangePhoneSessionStartOtpViaMailDto
  ) {
    try {
      const { guardianChangePhoneSessionStartOtpMail: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint,
        dto
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via MAIL to restart the guardian change phone session.
   *
   * @cookie session-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianChangePhoneSessionResendOtpMail() {
    try {
      const { guardianChangePhoneSessionResendOtpMail: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Verifies the OTP to continue the guardian change phone session.
   *
   * @cookie session-storage
   * @param dto - Input data required for OTP verification.
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianChangePhoneSessionVerifyOtp(dto: IVerificationCodeInput) {
    try {
      const { guardianChangePhoneSessionVerifyOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IVerificationCodeResponse>> =
        await httpRequest.post(endpoint, dto);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Completes the guardian change phone via mail session and start sms signin.
   *
   * @cookie ticket-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianChangePhoneSessionCompleteStartOtpSms() {
    try {
      const { guardianChangePhoneSessionCompleteStartOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Sends an OTP via SMS to restart the guardian change phone session.
   *
   * @cookie session-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianChangePhoneSessionResendOtpSms() {
    try {
      const { guardianChangePhoneSessionResendOtpSms: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  /**
   * Completes the student claim session.
   *
   * @cookie ticket-storage
   * @returns ApiResponse
   * @throws HttpException if the API call fails or returns an error.
   */
  async guardianChangePhoneSessionComplete() {
    try {
      const { guardianChangePhoneSessionComplete: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.post(
        endpoint
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }
  async refreshToken() {
    try {
      const { refreshTokens: endpoint } = paths;
      await httpRequest.post(endpoint);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }
      this.logger.error((error as Error).message);
      throw error;
    }
  }
}

export default new AuthService();
