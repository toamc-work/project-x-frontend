import React, { FC } from 'react';
import Questionnaire from '../../containers/questionnaire/Questionnaire.component-container';
 
 
type QuestionnairePageProps = unknown
  
const QuestionnairePage: FC<QuestionnairePageProps> = (_props): React.JSX.Element => {
  return (<Questionnaire/>);
}
 
export default QuestionnairePage;