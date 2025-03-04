import { Paper, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC, useState } from 'react';
import GuardianChangePhone from '../../../components/containers/guardian-change-phone/GuardianChangePhone.component-container';
import { GuardianChangePhoneErrorContextProvider } from './context/GuardianChangePhoneErrorContextProvider.context';
import GuardianChangePhoneStepper, {
  GuardianChangePhoneStepperSteps as StepEnum,
} from '../../steppers/GuardianChangePhoneStepper.component-stepper';

type GuardianChangePhoneDialogProps = {
  render: (openDialog: () => void) => React.JSX.Element;
};

const GuardianChangePhoneDialog: FC<GuardianChangePhoneDialogProps> = ({
  render,
}): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<StepEnum>(StepEnum.NewPhone);
  const handleOpen = () => {
    setOpen(true);
    setActiveStep(StepEnum.NewPhone);
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
          <GuardianChangePhoneStepper activeStep={activeStep} />
          <Paper
            sx={{
              maxWidth: 700,
              height: 400,
              mx: 'auto',
              mt: 4,
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
            }}
          >
            <GuardianChangePhoneErrorContextProvider>
              <GuardianChangePhone
                //isEmailVerified={isEmailVerified}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                closeDialog={handleClose}
              />
            </GuardianChangePhoneErrorContextProvider>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GuardianChangePhoneDialog;
