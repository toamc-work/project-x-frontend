export interface PostQuestionnaireSessionAnswerDto {
  sessionId: string;
  answer: string;
  event: AnswerType;
}

export enum AnswerType {
  Answered = 'answered',
  Skipped = 'skipped',
  Hinted = 'hint',
}