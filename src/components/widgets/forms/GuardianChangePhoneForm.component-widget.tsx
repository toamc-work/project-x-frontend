import React, { FC, useState } from "react";
import { GuardianChangePhoneSessionStartOtpViaMailDto } from "src/providers/api/auth/dto/guardian-change-phone-session-start-otp-via-mail.dto";
import { useOnMount } from "src/hooks/useOnMount.hook";
import geoService from "src/providers/api/geo/geo.service";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { MuiTelInput } from "mui-tel-input";
import { GuardianChangePhoneFormSchema } from "./factories/guardian-change-phone-form.factory";

interface GuardianChangPhoneFormProps {
  submitForm: (
    dto: GuardianChangePhoneSessionStartOtpViaMailDto,
  ) => Promise<void>;
  isEmailVerified: boolean;
  phoneAlreadyExists: boolean;
  invalidCredentials: boolean;
}

const GuardianChangPhoneForm: FC<GuardianChangPhoneFormProps> = ({
  submitForm,
  isEmailVerified,
  phoneAlreadyExists,
  invalidCredentials,
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
    isEmailVerified: true,
    phone: "",
    email: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const { isEmailVerified, email, phone } = values;
    await submitForm({
      isEmailVerified: isEmailVerified,
      email: email,
      phone: phone,
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
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={GuardianChangePhoneFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
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
            <MuiTelInput
              fullWidth
              disableFormatting={true}
              margin="normal"
              id="phone"
              name="phone"
              label="New Number"
              defaultCountry={(defaultCountry as any) || "US"}
              variant="outlined"
              value={values.phone}
              forceCallingCode
              onChange={(value) => setFieldValue("phone", value)}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            {!invalidCredentials && (
              <>
                <FormHelperText error={phoneAlreadyExists}>
                  {phoneAlreadyExists
                    ? "The phone you entered already exist please contact support"
                    : "Enter your new phone number"}
                </FormHelperText>
                <FormHelperText error={isEmailVerified}>
                  {isEmailVerified
                    ? ""
                    : "Your Email isn't Verified please contact support"}
                </FormHelperText>
              </>
            )}
            {invalidCredentials && (
              <>
                <FormHelperText error={invalidCredentials}>
                  {invalidCredentials
                    ? "please check again your mail and new phone"
                    : ""}
                </FormHelperText>
              </>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isEmailVerified}
            >
              {"Send Verification Email"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default GuardianChangPhoneForm;
