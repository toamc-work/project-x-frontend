import { AxiosError } from 'axios';

import { HttpException, Logger } from '@factories';
import { fakeRequest } from '@utils';
import { MethodNotModifiedException } from '@common/exceptions';

import { QUESTIONNAIRE } from './mock/questionnaire.mock';
import { IQuestionnaire } from './response/questionnaire.response';

export class QuestionnaireService {
  private readonly logger = new Logger(QuestionnaireService.name);

  async getQuestionnaire(): Promise<ApiResponse<IQuestionnaire>>{
    try {
      if (import.meta.env.DEV) {
        const data = await fakeRequest(QUESTIONNAIRE);
        const response: ApiResponse<IQuestionnaire> = {
          message: 'success',
          data: data,
        };
        return response;
      } else {
        throw new MethodNotModifiedException();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new HttpException(err.status as number, err.message);
      }

      this.logger.error((err as Error).message);
      throw err;
    }
  }

  //To add A send answer and receive next question
  //End of quiz
}

export default new QuestionnaireService();