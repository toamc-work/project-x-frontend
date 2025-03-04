export interface IQuestionnaire {
  readonly sessionId: string;
  readonly totalQuestions: number;
  readonly expiryTimestamp: number;
}

export interface IQuestion {
  readonly text: string;
  readonly possibleAnswers: [string, string, string, string];
  readonly levelName: string;
  readonly subtopicName: string;
  readonly topicName: string;
  readonly startTime: number;
  readonly hint: [number, number];
}