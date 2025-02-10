import React, { FC, useState } from 'react';
import { Paper, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SignupStudentStepper, {
  SignupStudentStepperSteps as StepsEnum,
} from '../../steppers/GuardianSignupStudentStepper.component-stepper';
import SignupStudent from '../../containers/guardian-signup-student/GuardianSignupStudent.component-container';
import { GuardianSignupStudentErrorContextProvider } from './context/GuardianSignupStudentErrorContextProvider.context';

type SignupStudentDialogProps = {
  render: (openDialog: () => void) => React.JSX.Element;
  phone: string;
  name: string;
};

const SignupStudentDialog: FC<SignupStudentDialogProps> = ({
  render,
  phone,
  name,
}): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<StepsEnum>(
    StepsEnum.SignupStudent
  );
  const handleOpen = () => {
    setOpen(true);
    setActiveStep(StepsEnum.SignupStudent);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {render(handleOpen)}
      <Dialog
        open={open}
        slotProps={{
          paper: {
            style: {
              width: '700px',
              maxWidth: '700px',
              borderRadius: '12px',
              padding: '20px',
            },
          },
        }}
      >
        {/* Close (Exit) Button in Top-Right */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ padding: '20px', minHeight: '100px' }}>
          <SignupStudentStepper activeStep={activeStep} />
          <Paper
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mt: 4,
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
            }}
          >
            <GuardianSignupStudentErrorContextProvider>
              <SignupStudent
                phone={phone}
                name={name}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                closeDialog={handleClose}
              />
            </GuardianSignupStudentErrorContextProvider>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignupStudentDialog;
