import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SigninPage from './components/pages/signin/Signin.component-page';
import QuestionnairePage from './components/pages/questionnaire/questionnaire.component-page';
//import { SocketConnectionContextProvider } from './contexts/SocketConnection.context';
import QuestionnaireFinishedPage from './components/pages/questionnaire/questionnaireFinished.component-page';

type AppProps = unknown;

const App: FC<AppProps> = (_props): React.JSX.Element => {
  return (
    //<SocketConnectionContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<SigninPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          {/* development */}
          <Route path="/finish" element={<QuestionnaireFinishedPage />} />
        </Routes>
      </BrowserRouter>
    //</SocketConnectionContextProvider>
  );
};

export default App;
