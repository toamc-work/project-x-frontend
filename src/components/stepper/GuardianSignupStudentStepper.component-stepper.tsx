import React, { FC } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ColoredStepperStyled from "./styled-components/ColoredStepper.styled-component";
import VerifyIcon from "@mui/icons-material/Verified";
import CompleteIcon from "@mui/icons-material/Done";

interface GuardianSignupStudentStepperProps {
  activeStep: number;
}

const GuardianSignupStudentStepper: FC<GuardianSignupStudentStepperProps> = ({
  activeStep,
}): React.JSX.Element => {
  return (
    <ColoredStepperStyled
      activeStep={activeStep}
      variant="default"
      steps={[
        {
          label: "signupStudent",
          icon: <PersonAddAlt1Icon />,
        },
        {
          label: "verify",
          icon: <VerifyIcon />,
        },
        {
          label: "complete",
          icon: <CompleteIcon />,
        },
      ]}
    />
  );
};

export default GuardianSignupStudentStepper;
