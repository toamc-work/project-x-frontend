import { Logger } from '@factories';
import { paths } from './definitions/constants';
// import { GuardianSignupSessionStartOtpSmsDto } from './dto/guardian-signup-session-start-otp-sms.dto';
// import { AuthenticationStartSessionOtpViaSmsDto } from './dto/authentication-start-session-otp-via-sms.dto';
// import { GuardianSignupStudentSessionStartOtpSmsDto } from './dto/guardian-signup-student-start-session-otp-via-sms.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import httpRequest from '../http-request';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpException } from '@factories';
import { GuardianSignupSessionStartOtpSmsDto } from './dto/guardian-signup-session-start-otp-sms.dto';
import { VerifyOtpResponse } from './response/verifyOtp.response';
// import { VerifyOtpResponse } from './response/verifyOtp.response';
// import { GuardianChangePhoneSessionStartOtpViaMailDto } from './dto/guardian-change-phone-session-start-otp-via-mail.dto';
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
  async guardianSignupSessionVerifyOtp(dto: VerifyOtpDto) {
    try {
      const { guardianSignupSessionVerifyOtp: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<VerifyOtpResponse>> =
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
