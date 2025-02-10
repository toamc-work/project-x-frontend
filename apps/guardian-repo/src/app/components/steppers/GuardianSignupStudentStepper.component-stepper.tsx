import React, { FC } from 'react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { ColoredStepperStyled } from '@shared-ui/styled-components';
import VerifyIcon from '@mui/icons-material/Verified';
import CompleteIcon from '@mui/icons-material/Done';

interface SignupStudentStepperProps {
  activeStep: number;
}

export enum SignupStudentStepperSteps {
  SignupStudent,
  Verify,
  Complete,
}

const SignupStudentStepper: FC<SignupStudentStepperProps> = ({
  activeStep,
}): React.JSX.Element => {
  return (
    <ColoredStepperStyled
      activeStep={activeStep}
      variant="default"
      steps={[
        {
          label: 'signupStudent',
          icon: <PersonAddAlt1Icon />,
        },
        {
          label: 'verify',
          icon: <VerifyIcon />,
        },
        {
          label: 'complete',
          icon: <CompleteIcon />,
        },
      ]}
    />
  );
};

export default SignupStudentStepper;
