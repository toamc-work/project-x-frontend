import React, { FC, useState } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThreeBaseStep } from "src/components/stepper/steps.enum";
import GuardianSignupStudentStepper from "src/components/stepper/GuardianSignupStudentStepper.component-stepper";
import GuardianSignupStudent from "src/components/containers/guardian-signup-student/GuardianSignupStudent.component-container";
import { GuardianSignupStudentErrorContextProvider } from "./context/GuardianSignupStudentErrorContextProvider.context";

type GuardianSignupStudentDialogProps = {
  render: (openDialog: () => void) => React.JSX.Element;
  phone: string;
  name: string;
};

const GuardianSignupStudentDialog: FC<GuardianSignupStudentDialogProps> = ({
  render,
  phone,
  name,
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
          <GuardianSignupStudentStepper activeStep={activeStep} />
          <Box
            sx={{
              maxWidth: 700,
              mx: "auto",
              mt: 4,
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: 2,
            }}
          >
            <GuardianSignupStudentErrorContextProvider>
              <GuardianSignupStudent
                phone={phone}
                name={name}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                closeDialog={handleClose}
              />
            </GuardianSignupStudentErrorContextProvider>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GuardianSignupStudentDialog;
