import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import variants, {
  ColorTuple,
  VariantsKeys,
} from "./themes/colored-stepper.theme";

interface Step {
  label: string;
  icon: React.ReactElement<unknown>;
}

interface ColoredStepperStyledProps {
  activeStep: number;
  steps: Step[];
  variant: VariantsKeys;
}

const ColoredStepperStyled: FC<ColoredStepperStyledProps> = ({
  activeStep,
  steps,
  variant,
}): React.JSX.Element => {
  const icons: { [index: string]: React.ReactElement } = Object.fromEntries(
    steps.map(({ icon }, i) => [String(i + 1), icon]),
  );
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<Connector colors={variants[variant]} />}
      >
        {steps.map(({ label }) => (
          <Step key={label}>
            <StepLabel
              slots={{
                stepIcon: (props) => (
                  <StepIcon
                    {...props}
                    icons={icons}
                    colors={variants[variant]}
                  />
                ),
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default ColoredStepperStyled;

const Connector = styled(StepConnector)<{ colors: ColorTuple }>(({
  theme,
  colors,
}) => {
  return {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: `linear-gradient(95deg,${colors[0]} 0%,${colors[1]} 50%,${colors[2]} 100%)`,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: `linear-gradient(95deg,${colors[0]} 0%,${colors[1]} 50%,${colors[2]} 100%)`,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: "#eaeaf0",
      borderRadius: 1,
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
  };
});

const StepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
  colors: ColorTuple;
}>(({ theme, colors }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage: `linear-gradient( 136deg,${colors[0]} 0%,${colors[1]} 50%,${colors[2]} 100% )`,
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage: `linear-gradient( 136deg,${colors[0]} 0%,${colors[1]} 50%,${colors[2]} 100% )`,
      },
    },
  ],
}));

function StepIcon(
  props: StepIconProps & {
    icons: { [index: string]: React.ReactElement<unknown> };
    colors: ColorTuple;
  },
) {
  const { active, completed, icons, colors } = props;
  return (
    <StepIconRoot ownerState={{ completed, active }} colors={colors}>
      {icons[String(props.icon)]}
    </StepIconRoot>
  );
}
