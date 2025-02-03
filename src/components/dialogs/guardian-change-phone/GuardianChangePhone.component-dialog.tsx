import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { FC, useState } from "react";
import { ThreeBaseStep } from "src/components/stepper/steps.enum";
import GuardianChangePhoneStepper from "src/components/stepper/GuardianChangePhoneStepper.componet-stepper";
import GuardianChangePhone from "src/components/containers/guardian-change-phone/GuardianChangePhone.component-container";

type GuardianChangePhoneDialogProps = {
  render: (openDialog: () => void) => React.JSX.Element;
  isEmailVerified: boolean;
};

const GuardianChangePhoneDialog: FC<GuardianChangePhoneDialogProps> = ({
  render,
  isEmailVerified,
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
          <GuardianChangePhoneStepper activeStep={activeStep} />
          <Box
            sx={{
              maxWidth: 700,
              height: 400,
              mx: "auto",
              mt: 4,
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            <GuardianChangePhone
              isEmailVerified={isEmailVerified}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              closeDialog={handleClose}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GuardianChangePhoneDialog;
