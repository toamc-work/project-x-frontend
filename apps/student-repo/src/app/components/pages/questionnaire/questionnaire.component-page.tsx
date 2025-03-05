import React, { FC, Suspense, useEffect } from 'react';
import {useParams} from 'react-router'
import LevelQuestionnaire from '../../containers/questionnaire/Questionnaire.component-container';
import questionnaireService from '../../../providers/api/questionnaire/questionnaire.service';
import { QuestionnaireContextProvider } from '../../containers/questionnaire/context/Questionnaire.context-provider';
//import { Questionnaire } from '../../widgets/questionnaire/Questionnaire.component-composite';
// import { QuestionnaireBox } from '../../widgets/questionnaire_v2/ui';

type QuestionnairePageProps = unknown;

const QuestionnairePage: FC<QuestionnairePageProps> = (
  _props
): React.JSX.Element => {
  const { sessionId } = useParams<{ sessionId: string }>() as {sessionId:string};

  return (
    <QuestionnaireContextProvider sessionId={sessionId}>
      <div></div>
      {/* <LevelQuestionnaire={requestQuestionnaire} /> */}
      </QuestionnaireContextProvider>
  );
};

export default QuestionnairePage;
