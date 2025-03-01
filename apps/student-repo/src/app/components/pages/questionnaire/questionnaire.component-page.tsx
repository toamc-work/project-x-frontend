'use client';
import React, { FC, Suspense } from 'react';
import LevelQuestionnaire from '../../containers/questionnaire/Questionnaire.component-container';
import QuestionnaireService from '../../../providers/api/questionnaire/questionnaire.service';
//import { Questionnaire } from '../../widgets/questionnaire/Questionnaire.component-composite';
// import { QuestionnaireBox } from '../../widgets/questionnaire_v2/ui';

type QuestionnairePageProps = unknown;

const QuestionnairePage: FC<QuestionnairePageProps> = (
  _props
): React.JSX.Element => {
  const requestQuestionnaire = QuestionnaireService.getQuestionnaire()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LevelQuestionnaire questionnairePromise={requestQuestionnaire} />
    </Suspense>
  );
};

export default QuestionnairePage;
