import React, { FC } from 'react';
import ColoredStepperStyled from './styled-components/ColoredStepper.styled-component';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifyIcon from '@mui/icons-material/Verified';
import CompleteIcon from '@mui/icons-material/Done';

interface StudentClaimStepperProps {
  activeStep: number;
}

const StudentClaimStepper: FC<StudentClaimStepperProps> = ({
  activeStep,
}): React.JSX.Element => {
  return (
    <ColoredStepperStyled
      activeStep={activeStep}
      variant="default"
      steps={[
        {
          label: 'phone',
          icon: <PhoneIcon />,
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

export default StudentClaimStepper;
