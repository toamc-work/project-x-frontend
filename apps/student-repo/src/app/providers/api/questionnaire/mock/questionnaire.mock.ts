import { IQuestionData, IQuestionnaire } from "../response/questionnaire.response";


export const QUESTIONNAIRE: IQuestionnaire = {
  questionnaireId: 1,
  totalQuestions: 3,
  sessionId: '4eac2c9f-5a2a-4f6d-a57b-9df7d6e8b8c1', // Example UUID
}

export const FIRST_QUESTION: IQuestionData = {
  questionId: '1',
  levelDifficulty: 'Beginner',
  text: "What is 9 + 5 equals?",
  possibleAnswers: ["8", "11", "20", "14"],
  subTopic: 'addition'
}

export const NEXT_QUESTION: IQuestionData = {
  questionId: '2',
  levelDifficulty: 'Beginner',
  text: 'What is 3 + 5 equals?',
  possibleAnswers: ['2', '6', '8', '10'],
  subTopic: 'addition'
}

export const FINAL_QUESTION: IQuestionData = {
  questionId: '3',
  levelDifficulty: 'Intermediate',
  text: 'What is 16 + 21 equals?',
  possibleAnswers: ['32', '37', '46', '29'],
  subTopic: 'addition'
}

