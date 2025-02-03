import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import GuardianProfilePage from "src/components/pages/guardian/guardian-profile/GuardianProfile.component-page";

type GuardianRouteProps = unknown;

const GuardianRoute: FC<GuardianRouteProps> = (_props): React.JSX.Element => {
  return (
    <Routes>
      <Route path="profile" element={<GuardianProfilePage />} />
    </Routes>
  );
};

export default GuardianRoute;
