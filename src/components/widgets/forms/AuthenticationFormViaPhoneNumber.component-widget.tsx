import { Box, Button } from "@mui/material";
import React, { FC, useState } from "react";
import { Formik, Form } from "formik";
import { LoginFormSchema } from "./factories/login-form.factory";
import { MuiTelInput } from "mui-tel-input";
import { useOnMount } from "src/hooks/useOnMount.hook";
import geoService from "src/providers/api/geo/geo.service";
import { AuthenticationStartSessionOtpViaSmsDto } from "src/providers/api/auth/dto/authentication-start-session-otp-via-sms.dto";

interface AuthenticationFormViaPhoneNumberWidgetProps {
  submitForm: (dto: AuthenticationStartSessionOtpViaSmsDto) => Promise<void>;
  phoneNumberErrorMessage?: string | undefined;
  defaultPhone?: string;
  btnTxt?: string;
}

const AuthenticationFormViaPhoneNumberWidget: FC<
  AuthenticationFormViaPhoneNumberWidgetProps
> = ({
  submitForm,
  phoneNumberErrorMessage,
  defaultPhone = "",
  btnTxt = "submit",
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
    phone: defaultPhone,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const { phone } = values;
    await submitForm({ phone });
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
        validationSchema={LoginFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
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
              error={
                Boolean(phoneNumberErrorMessage) ||
                (touched.phone && Boolean(errors.phone))
              }
              helperText={
                (touched.phone && errors.phone) ?? phoneNumberErrorMessage
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              {btnTxt}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthenticationFormViaPhoneNumberWidget;
