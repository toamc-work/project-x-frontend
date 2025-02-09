import React, { FC } from 'react';
import ColoredStepperStyled from './styled-components/ColoredStepper.styled-component';
import EmailIcon from '@mui/icons-material/Email';
import VerifyIcon from '@mui/icons-material/Verified';
import CompleteIcon from '@mui/icons-material/Done';
interface EmailVerificationStepperProps {
  activeStep: number;
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
