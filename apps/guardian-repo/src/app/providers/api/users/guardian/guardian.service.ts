import { AxiosError } from 'axios';

import { HttpException, Logger } from '@factories';
import { fakeRequest } from '@utils';
import { MethodNotModifiedException } from '@common/exceptions';

import { USER_PROFILE } from './mock/user-profile.mock';
import { IUserProfile } from './response/user-profile.response';

export class GuardianService {
  private readonly logger = new Logger(GuardianService.name);

  async userProfile(): Promise<ApiResponse<IUserProfile>> {
    try {
      if (import.meta.env.DEV) {
        const data = await fakeRequest(USER_PROFILE);

        const response: ApiResponse<IUserProfile> = {
          message: 'success',
          data: data,
        };

        return response;
      } else {
        throw new MethodNotModifiedException();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }
}

export default new GuardianService();
