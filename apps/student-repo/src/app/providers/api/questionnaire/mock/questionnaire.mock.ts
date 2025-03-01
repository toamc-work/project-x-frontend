import { IQuestionActive, IQuestionInactive, IQuestionnaireStart } from "../response/questionnaire.response";


export const QUESTIONNAIRE: IQuestionnaireStart = {
  questionnaireId: '1',
  totalQuestions: 20,
  sessionId: '4eac2c9f-5a2a-4f6d-a57b-9df7d6e8b8c1', // Example UUID
  expiryTimestamp: Date.now() + 60000
}

export const QUESTION_DATA: IQuestionActive = {
  questionId: '2',
  active: true,
  questionNumber: 2,
  questionLevel: 'Beginner',
  questionTitle: "What is 9 + 5 equals?",
  questionPossibleAnswers: ["8", "11", "20", "14"],
  questionHint: [0, 2],
  topic: 'Counting',
  subTopic: 'addition',
}

export const NEXT_QUESTION: IQuestionActive = {
  questionId: '1',
  active: true,
  questionNumber: 1,
  questionLevel: 'Intermediate',
  questionTitle: "What is 16 + 21 equals?",
  questionPossibleAnswers: ['32', '37', '46', '29'],
  questionHint: [2, 3],
  topic: 'Counting',
  subTopic: 'addition',
}

export const INACTIVE_QUESTION: IQuestionInactive = {
  questionId: null,
  active: false,
  questionNumber: null,
  questionLevel: null,
  questionTitle: null,
  questionPossibleAnswers: null,
  questionHint: null,
  topic: null,
  subTopic: null,
}

