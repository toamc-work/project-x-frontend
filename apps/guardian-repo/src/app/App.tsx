import React, { FC } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

type AppProps = unknown;

const App: FC<AppProps> = (_props): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default App;
