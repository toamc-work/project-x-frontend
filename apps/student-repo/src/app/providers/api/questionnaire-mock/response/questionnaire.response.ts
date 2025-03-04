export interface IQuestionData {
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

export interface IQuestionnaireStart {
  readonly sessionId: string;
  readonly questionnaireId: string;
  readonly totalQuestions: number;
  readonly expiryTimestamp: number;
}

export interface IQuestionActive {
  readonly active: true;
  readonly questionId: string;
  readonly questionNumber: number;
  readonly topic: string;
  readonly subTopic: string;
  readonly questionLevel: string;
  readonly questionTitle: string;
  readonly questionPossibleAnswers: [string, string, string, string];
  readonly questionHint: [number, number];
}
export interface IQuestionInactive {
  readonly active: false;
  readonly questionId: null;
  readonly questionNumber: null;
  readonly topic: null;
  readonly subTopic: null;
  readonly questionLevel: null;
  readonly questionTitle: null;
  readonly questionPossibleAnswers: null;
  readonly questionHint: null;
}

export type IQuestion = IQuestionActive | IQuestionInactive;

export interface ISubmitAnswer {
  sessionId: string;
  questionId: string;
  possibleAnswer: string;
  type: ['regular', 'hint', 'skip', 'expired'];
}

/* check if session alive
-----------------------
alive: true
session id:  string
| 
alive: false
session id: null

get alive session (session id)
-----------------------------
session id --> string
questionnaire id --> string
topic --> Counting 
total questions --> 20
expiry timestamp --> number
 */
