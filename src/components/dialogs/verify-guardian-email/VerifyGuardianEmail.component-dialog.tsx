import React, { FC, useState } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailVerificationStepper from "src/components/stepper/EmailVerificationStepper.component-stepper";
import { ThreeBaseStep } from "src/components/stepper/steps.enum";
import EmailVerification from "src/components/containers/email-verification/EmailVerification.component-container";
import { VerifyGuardianEmailErrorContextProvider } from "./context/VerifyGuardianEmailErrorContextProvider";

type VerifyGuardianEmailDialogProps = {
  render: (openDialog: () => void) => React.JSX.Element;
  email: string;
};

const VerifyGuardianEmailDialog: FC<VerifyGuardianEmailDialogProps> = ({
  render,
  email,
}): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<ThreeBaseStep>(
    ThreeBaseStep.Start,
  );

  const handleOpen = () => {
    setOpen(true);
    setActiveStep(0);
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
              width: "700px",
              maxWidth: "700px",
              borderRadius: "12px",
              padding: "20px",
            },
          },
        }}
      >
        {/* Close (Exit) Button in Top-Right */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ padding: "20px", minHeight: "100px" }}>
          <EmailVerificationStepper activeStep={activeStep} />
          <Box
            sx={{
              maxWidth: 700,
              height: 300,
              mx: "auto",
              mt: 4,
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            <VerifyGuardianEmailErrorContextProvider>
              <EmailVerification
                email={email}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                closeDialog={handleClose}
              />
            </VerifyGuardianEmailErrorContextProvider>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerifyGuardianEmailDialog;
