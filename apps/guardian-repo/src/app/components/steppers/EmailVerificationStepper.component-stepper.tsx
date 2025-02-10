import React, { FC } from 'react';
import { ColoredStepperStyled } from '@shared-ui/styled-components';
import EmailIcon from '@mui/icons-material/Email';
import VerifyIcon from '@mui/icons-material/Verified';
import CompleteIcon from '@mui/icons-material/Done';
interface EmailVerificationStepperProps {
  activeStep: number;
}

export enum EmailVerificationStepperSteps {
  Email,
  Verify,
  Complete,
}

const EmailVerificationStepper: FC<EmailVerificationStepperProps> = ({
  activeStep,
}): React.JSX.Element => {
  return (
    <ColoredStepperStyled
      activeStep={activeStep}
      variant="default"
      steps={[
        {
          label: 'email',
          icon: <EmailIcon />,
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

export default EmailVerificationStepper;
