import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { SignupFormSchema } from "./factories/signup-form.factory";
import { MuiTelInput } from "mui-tel-input";
import { useOnMount } from "src/hooks/useOnMount.hook";
import geoService from "src/providers/api/geo/geo.service";
import { GuardianSignupSessionStartOtpSmsDto } from "src/providers/api/auth/dto/guardian-signup-session-start-otp-sms.dto";

interface SignupFormWidgetProps {
  submitForm: (dto: GuardianSignupSessionStartOtpSmsDto) => Promise<void>;
  invalidInput: boolean;
}

const SignupFormWidget: FC<SignupFormWidgetProps> = ({
  submitForm,
  invalidInput,
}): React.JSX.Element => {
  const [defaultCountry, setDefaultCountry] = useState("");

  useOnMount(() => {
    const apiRequest = async () => {
      const metadata = await geoService.getGeoMetadata();

      setDefaultCountry(metadata.countryCode);
    };

    apiRequest();
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const { email, phone, firstName, lastName } = values;
    const name = `${firstName} ${lastName}`;
    await submitForm({
      email: email,
      phone: phone,
      name: name,
    });
  };
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Typography textAlign={"center"} variant="h1" component="h1">
        {"Sign Up Form"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            {/* First Name */}
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            {/* Last Name */}
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            {/* Email */}
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            {/* Phone Number with Country Code */}
            <MuiTelInput
              fullWidth
              disableFormatting={true}
              margin="normal"
              id="phone"
              name="phone"
              label="Phone Number"
              defaultCountry={(defaultCountry as any) || "US"}
              variant="outlined"
              value={values.phone}
              forceCallingCode
              onChange={(value) => setFieldValue("phone", value)}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <FormHelperText variant="filled" error={invalidInput}>
              {invalidInput ? "Please Verify your credentials" : ""}
            </FormHelperText>
            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              {"Sign Up"}
            </Button>
          </Form>
        )}
      </Formik>
      <Link to={"../signin"}>{"Already have an account? Sign In"}</Link>
    </Box>
  );
};

export default SignupFormWidget;
