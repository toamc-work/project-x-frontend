import { Logger, HttpException } from '@factories';
import { paths } from './definitions/constants';
import { QuestionnaireSessionDto } from './dto/questionnaire-session.dto';
import httpRequest from '../http-request';
import { AxiosError, AxiosResponse } from 'axios';
import { PostQuestionnaireSessionAnswerDto } from './dto/post-questionnaire-session-answer.dto';
import { IQuestion, IQuestionnaire, ISessionStatus } from './response/questionnaire.response';

class QuestionnaireService {
  private readonly logger = new Logger(QuestionnaireService.name);

  async startQuestionnaireSession() {
    try {
      const { startSession: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IQuestionnaire>> =
        await httpRequest.post(endpoint);

      return data;
    } catch (error) {
      //validate correct error handling
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  async questionnaireGetCurrentQuestion(dto: QuestionnaireSessionDto) {
    try {
      const { getCurrentQuestion: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse<IQuestion>> =
        await httpRequest.patch(endpoint, dto);

      return data;
    } catch (error) {
      //validate correct error handling
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  async questionnaireSendPossibleAnswer(
    dto: PostQuestionnaireSessionAnswerDto
  ) {
    try {
      const { possibleAnswer: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.patch(
        endpoint,
        dto
      );

      return data;
    } catch (error) {
      //validate correct error handling
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  async questionnaireAliveCheck() {
    try {
      const { aliveCheck: endpoint } = paths;
      const { data }: AxiosResponse<ApiResponse> = await httpRequest.get(
        endpoint
      );

      return data;
    } catch (error) {
      //validate correct error handling
      if (error instanceof AxiosError) {
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  async getCurrentQuestionnaire({ sessionId }: QuestionnaireSessionDto) {
    try {
      const { getCurrentSession: endpoint } = paths;
      const params = [sessionId].join('/')
      console.log(`${endpoint}/${params}`)
      const { data }: AxiosResponse<ApiResponse<IQuestionnaire>> = await httpRequest.get(`${endpoint}/${params}`);
      return data;
    } catch (error) {
      //validate correct error handling
      if (error instanceof AxiosError) {
        console.log(error.message)
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }

  async getCurrentQuestionnaireStatus({ sessionId }: QuestionnaireSessionDto) {
    try {
      const { getCurrentSessionStatus: endpoint } = paths;
      const params = [sessionId].join('/')
      console.log(`${endpoint}/${params}`)
      const { data }: AxiosResponse<ApiResponse<ISessionStatus>> = await httpRequest.get(`${endpoint}/${params}`);
      return data;
    } catch (error) {
      //validate correct error handling
      if (error instanceof AxiosError) {
        console.log(error.message)
        throw new HttpException(error.status as number, error.message);
      }

      this.logger.error((error as Error).message);
      throw error;
    }
  }
}
export default new QuestionnaireService();
