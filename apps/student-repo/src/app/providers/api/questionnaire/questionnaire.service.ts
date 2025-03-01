import { AxiosError } from 'axios';

import { HttpException, Logger } from '@factories';
import { fakeRequest } from '@utils';
import { MethodNotModifiedException } from '@common/exceptions';

import { QUESTION_DATA, INACTIVE_QUESTION, QUESTIONNAIRE } from './mock/questionnaire.mock';
import { IQuestion, IQuestionActive, IQuestionInactive, IQuestionnaireStart } from './response/questionnaire.response';

export class QuestionnaireService {
  private readonly logger = new Logger(QuestionnaireService.name);

  async getQuestionnaire(): Promise<ApiResponse<IQuestionnaireStart>>{
    try {
      if (import.meta.env.DEV) {
        const data = await fakeRequest(QUESTIONNAIRE);
        const response: ApiResponse<IQuestionnaireStart> = {
          message: 'success',
          data: {
            sessionId: data.sessionId,
            questionnaireId: data.questionnaireId,
            totalQuestions: data.totalQuestions,
            expiryTimestamp: data.expiryTimestamp
          }
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

  async getQuestion(): Promise<ApiResponse<IQuestion>> {
    try {
      if (import.meta.env.DEV) {
        const data = await fakeRequest<IQuestionActive>(QUESTION_DATA);
        const response: ApiResponse<IQuestion> = {
          message: 'success',
          data: {
            questionId: data.questionId,
            active: true,
            questionNumber: data.questionNumber,
            questionLevel: data.questionLevel,
            questionTitle: data.questionTitle,
            questionPossibleAnswers: data.questionPossibleAnswers,
            questionHint: data.questionHint,
            topic: data.topic,
            subTopic: data.subTopic
          }
        };
        return response;
      } else {
        throw new MethodNotModifiedException();
      }
    } catch(err) {
      if (err instanceof AxiosError) {
        throw new HttpException(err.status as number, err.message);
      }
  
      this.logger.error((err as Error).message);
      throw err;
    }
  } 
  async getQuestionBad(): Promise<ApiResponse<IQuestion>> {
    try {
      if (import.meta.env.DEV) {
        const data = await fakeRequest<IQuestionInactive>(INACTIVE_QUESTION);
        const response: ApiResponse<IQuestion> = {
          message: 'success',
          data: {
            questionId: data.questionId,
            active: false,
            questionNumber: data.questionNumber,
            questionLevel: data.questionLevel,
            questionTitle: data.questionTitle,
            questionPossibleAnswers: data.questionPossibleAnswers,
            questionHint: data.questionHint,
            topic: data.topic,
            subTopic: data.subTopic
          }
        };
        return response;
      } else {
        throw new MethodNotModifiedException();
      }
    } catch(err) {
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