import React, { FC } from 'react';
import { ColoredStepperStyled } from '@shared-ui/styled-components';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifyIcon from '@mui/icons-material/Verified';
import DoneIcon from '@mui/icons-material/Done';
import CompleteIcon from '@mui/icons-material/DoneAll';

interface GuardianChangePhoneStepperProps {
  activeStep: number;
}

export enum GuardianChangePhoneStepperSteps {
  NewPhone,
  EnterCode,
  Signin,
  VerifyPhone,
  Complete,
}

const GuardianChangePhoneStepper: FC<GuardianChangePhoneStepperProps> = ({
  activeStep,
}): React.JSX.Element => {
  return (
    <ColoredStepperStyled
      activeStep={activeStep}
      variant="default"
      steps={[
        {
          label: 'New Phone',
          icon: <PhoneIcon />,
        },
        {
          label: 'Enter Code',
          icon: <VerifyIcon />,
        },
        {
          label: 'Signin',
          icon: <DoneIcon />,
        },
        {
          label: 'Verify Phone',
          icon: <VerifyIcon />,
        },
        {
          label: 'Complete',
          icon: <CompleteIcon />,
        },
      ]}
    />
  );
};

export default GuardianChangePhoneStepper;
