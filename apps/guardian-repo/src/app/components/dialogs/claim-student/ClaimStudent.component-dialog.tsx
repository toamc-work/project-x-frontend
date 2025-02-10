import React, { FC, useState } from 'react';
import { Paper, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StudentClaim from '../../containers/student-claim/StudentClaim.component-container';
import StudentClaimStepper, {
  StudentClaimStepperSteps as StepsEnum,
} from '../../steppers/StudentClaimStepper.component-stepper';
import { ClaimStudentErrorContextProvider } from './context/ClaimStudentErrorContextProvider.context';

type ClaimStudentDialogProps = {
  render: (openDialog: () => void) => React.JSX.Element;
  phone: string;
};

const ClaimStudentDialog: FC<ClaimStudentDialogProps> = ({
  render,
  phone,
}): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<StepsEnum>(StepsEnum.Phone);
  const handleOpen = () => {
    setOpen(true);
    setActiveStep(StepsEnum.Phone);
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
          <StudentClaimStepper activeStep={activeStep} />
          <Paper
            sx={{
              maxWidth: 700,
              height: 300,
              mx: 'auto',
              mt: 4,
              p: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 2,
            }}
          >
            <ClaimStudentErrorContextProvider>
              <StudentClaim
                phone={phone}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                closeDialog={handleClose}
              />
            </ClaimStudentErrorContextProvider>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClaimStudentDialog;
