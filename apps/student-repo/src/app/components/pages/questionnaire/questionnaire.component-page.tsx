import React, { FC } from 'react';
// import Questionnaire from '../../containers/questionnaire/Questionnaire.component-container';
import { Questionnaire } from '../../widgets/questionnaire_v2/Questionnaire.component-composite';
// import { QuestionnaireBox } from '../../widgets/questionnaire_v2/ui';

type QuestionnairePageProps = unknown;

const QuestionnairePage: FC<QuestionnairePageProps> = (
  _props
): React.JSX.Element => {
  return (
    <Questionnaire>
      <Questionnaire.QuestionnaireInfo questionnaireInfo="Level Questionnaire / Multiplication and Division" />
      <Questionnaire.QuestionTitle questionTitle="How many apples are there if you have {a} apples and you get {b} more?" />
      <Questionnaire.QuestionDifficulty questionDifficulty="Intermediate" />
      <Questionnaire.QuestionNumber questionNumber={`Question No. ${"12"}`} />
      {/* <Questionnaire.Hint>Hint</Questionnaire.Hint> */}
      <Questionnaire.PossibleAnswers
        render={{
          data: ["It is not cold.", "It is cold, but the lake is heated.", "The lake is frozen.", "It is cold and the lake is frozen."],
          mapper: (PossibleAnswer) => (
            <PossibleAnswer
              onClick={() => {
                console.log('handle next question');
              }}
            />
          ),
        }}
      />

      <Questionnaire.SkipQuestion handleSkip={()=> console.log("handle skip")}/>
      {/* <Questionnaire.SubmitQuestion>
        Submit Question
      </Questionnaire.SubmitQuestion> */}
      <Questionnaire.DiscardQuestionnaire
        handleDiscard={() => console.log('clicked discard')}
      />

      <Questionnaire.TimerDown expiryTimestamp={1740520800000}/>
      <Questionnaire.TimerUp/>
    </Questionnaire>
  );
};

export default QuestionnairePage;
