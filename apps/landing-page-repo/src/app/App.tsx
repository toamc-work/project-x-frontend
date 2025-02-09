import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './components/pages/signup/Signup.component-page';
type AppProps = unknown;

const App: FC<AppProps> = (_props): React.JSX.Element => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default App;
