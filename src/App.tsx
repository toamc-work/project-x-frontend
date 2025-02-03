import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./routes/auth/Auth.component-route";
import GuardianRoute from "./routes/guardian/Guardian.component-route";

type AppProps = unknown;

const App: FC<AppProps> = (_props): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<AuthRoute />} />
        <Route path="parent/*" element={<GuardianRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
