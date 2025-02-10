import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SigninPage from './components/pages/signin/Signin.component-page';

type AppProps = unknown;

const App: FC<AppProps> = (_props): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
