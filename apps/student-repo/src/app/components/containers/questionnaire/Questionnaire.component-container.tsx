'use client';
import React, { FC, use, useEffect, useState } from 'react';
import { Questionnaire } from '../../widgets/questionnaire/Questionnaire.component-composite';
import QuestionnaireService from '../../../providers/api/questionnaire/questionnaire.service';
import {
  IQuestionActive,
  IQuestionInactive,
  IQuestionnaireStart,
} from '../../../providers/api/questionnaire/response/questionnaire.response';
import { utcToLocal } from '../../../providers/utils/utcToLocal';

type LevelQuestionnaireProps = {
  questionnairePromise: Promise<ApiResponse<IQuestionnaireStart>>;
};

const initialValues: IQuestionActive = {
  questionId: '1',
  active: true,
  questionNumber: 1,
  questionLevel: 'Intermediate',
  questionTitle: 'What is 16 + 21 equals?',
  questionPossibleAnswers: ['32', '37', '46', '29'],
  questionHint: [2, 3],
  topic: 'Counting',
  subTopic: 'addition',
};

const LevelQuestionnaire: FC<LevelQuestionnaireProps> = ({
  questionnairePromise,
}): React.JSX.Element => {
  const [question, setQuestion] = useState<IQuestionActive | IQuestionInactive>(
    initialValues
  );
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [offsetTimestamp, setOffsetTimestamp] = useState<Date>(new Date(utcToLocal()));
  const questionnaireResponse = use(questionnairePromise);

  const handleSubmit = async (answer: string | null, type: string) => {
    console.log('handle submit with args:', answer, type);
    //api submit question with answer and type
    const nextQuestion = await QuestionnaireService.getQuestion();
    setQuestion(nextQuestion.data);
    setOffsetTimestamp(new Date(utcToLocal()));
    setHintUsed(false);
  };

  const handleExpired = () => {
    handleSubmit(null, 'expired');
    console.log('handle expired');
  };

  const handleHint = () => {
    console.log('handle hint with index:', question.questionHint);
    setHintUsed(true);
  };

  return (
    <Questionnaire>
      <Questionnaire.Info>
        Level Questionnaire / {question.topic} - {question.subTopic}
      </Questionnaire.Info>
      <Questionnaire.Title
        title={question.questionTitle ? question.questionTitle : 'bad'}
      />
      <Questionnaire.Timer
        expiryTimestamp={
          questionnaireResponse.data.expiryTimestamp
            ? questionnaireResponse.data.expiryTimestamp
            : 1740834602000
        }
        onExpire={handleExpired}
      />
      <Questionnaire.StopWatch
        offsetTimestamp={offsetTimestamp}
      />
      <Questionnaire.SkipBtn
        performSkipAction={() => handleSubmit(null, 'skip')}
      />
      <Questionnaire.QuestionNumber
        questionNumber={`number ${question.questionNumber}/ ${questionnaireResponse.data.totalQuestions}`}
      />
      <Questionnaire.QuestionDifficulty
        level={question.questionLevel ? question.questionLevel : 'bad'}
      />
      <Questionnaire.DiscardBtn
        performDiscardAction={() => console.log('preform discard action')}
      />
      <Questionnaire.HintBtn
        enabled={true}
        hint={question.questionHint}
        handleHint={handleHint}
      />
      <Questionnaire.PossibleAnswers
        render={{
          data: question.questionPossibleAnswers
            ? question.questionPossibleAnswers
            : ['something', 'went', 'wrong', 'here'],
          mapper: (PossibleAnswer, index) => {
            return (
              <PossibleAnswer
                key={index}
                isHinted={
                  hintUsed &&
                  question.questionHint &&
                  question.questionHint.includes(index)
                    ? true
                    : false
                }
                onClick={async (answer) =>
                  await handleSubmit(answer, hintUsed ? 'hint' : 'regular')
                }
              />
            );
          },
        }}
      />
    </Questionnaire>
  );
};
//{console.log('possible answer args:', key, isHinted)}
export default LevelQuestionnaire;
