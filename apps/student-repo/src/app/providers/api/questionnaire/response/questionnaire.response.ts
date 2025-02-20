export interface IQuestionData{
  readonly questionId: string;
  readonly levelDifficulty: string;
  readonly subTopic: string;
  readonly text: string;
  readonly possibleAnswers: [string, string, string, string];
}

export interface IQuestionnaire {
  readonly questionnaireId: number;
  readonly totalQuestions: number;
  readonly sessionId: string;
}