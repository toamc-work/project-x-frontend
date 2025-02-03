import { Logger } from "src/providers/utils/logger.util";
import { USER_PROFILE } from "./mock/user-profile.mock";
import { AxiosError } from "axios";
import { HttpException } from "src/common/errors/factories/exception.factory";
import { fakeRequest } from "src/providers/utils/fake-request.util";
import { toModifyError } from "src/providers/utils/to-modify-error.util";

export class GuardianService {
  private readonly logger = new Logger(GuardianService.name);

  async userProfile() {
    try {
      if (import.meta.env.DEV) {
        return await fakeRequest(USER_PROFILE);
      } else {
        throw toModifyError;
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
