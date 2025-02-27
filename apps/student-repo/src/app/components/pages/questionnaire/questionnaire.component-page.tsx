import React, { FC } from 'react';
// import Questionnaire from '../../containers/questionnaire/Questionnaire.component-container';
import { Questionnaire } from '../../widgets/questionnaire/Questionnaire.component-composite';
// import { QuestionnaireBox } from '../../widgets/questionnaire_v2/ui';

type QuestionnairePageProps = unknown;

const QuestionnairePage: FC<QuestionnairePageProps> = (
  _props
): React.JSX.Element => {
  return (
    <Questionnaire>
      <Questionnaire.Info>
        Level Questionnaire / Multiplication and Division
      </Questionnaire.Info>
      <Questionnaire.Title title="Hello world" />
      <Questionnaire.Timer expiryTimestamp={1840520800000} />
      <Questionnaire.StopWatch />
      <Questionnaire.SkipBtn
        performSkipAction={() => console.log('performSkipAction')}
      />
      <Questionnaire.QuestionNumber questionNumber="Q-10" />
      <Questionnaire.QuestionDifficulty level="Advanced" />
      <Questionnaire.DiscardBtn
        performDiscardAction={() => console.log('preform discard action')}
      />
      <Questionnaire.HintBtn enabled={false} hint={{}} questionId={1} />
      <Questionnaire.PossibleAnswers
        render={{
          data: [
            'It is not cold.',
            'It is cold, but the lake is heated.',
            'The lake is frozen.',
            'It is cold and the lake is frozen.',
          ],
          mapper: (PossibleAnswer, index) => {
            return (
              <PossibleAnswer
                key={index}
                onClick={() => {
                  console.log('handle next question');
                }}
              />
            );
          },
        }}
      />
    </Questionnaire>
  );
};

export default QuestionnairePage;
