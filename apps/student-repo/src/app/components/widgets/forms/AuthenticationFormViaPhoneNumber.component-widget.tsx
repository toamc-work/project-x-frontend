import { Box, Button, FormHelperText } from '@mui/material';
import React, { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { LoginFormSchema } from './factories/login-form.factory';
import { MuiTelInput } from 'mui-tel-input';
import { useOnMount } from '../../../hooks/useOnMount.hook';
import geoService from '../../../providers/api/geo/geo.service';
import { AuthenticationStartSessionOtpViaSmsDto } from '../../../providers/api/auth/dto/authentication-start-session-otp-via-sms.dto';

interface AuthenticationFormViaPhoneNumberWidgetProps {
  submitForm: (dto: AuthenticationStartSessionOtpViaSmsDto) => Promise<void>;
  phoneNumberErrorMessage?: string | undefined;
  defaultPhone?: string;
  btnTxt?: string;
  invalidInput: boolean;
}

const AuthenticationFormViaPhoneNumberWidget: FC<
  AuthenticationFormViaPhoneNumberWidgetProps
> = ({
  submitForm,
  phoneNumberErrorMessage,
  defaultPhone = '',
  btnTxt = 'submit',
  invalidInput,
}): React.JSX.Element => {
  const [defaultCountry, setDefaultCountry] = useState('');

  useOnMount(() => {
    const apiRequest = async () => {
      const metadata = await geoService.getGeoMetadata();

      setDefaultCountry(metadata.countryCode);
    };

    apiRequest();
  });

  const initialValues = {
    phone: defaultCountry + defaultPhone,
  };
  const handleSubmit = async (values: typeof initialValues) => {
    const { phone } = values;
    await submitForm({ phone });
  };
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={LoginFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <Form>
            <MuiTelInput
              fullWidth
              disableFormatting={true}
              margin="normal"
              id="phone"
              name="phone"
              label="Phone Number"
              defaultCountry={(defaultCountry as never) || 'US'}
              variant="outlined"
              value={values.phone}
              forceCallingCode
              onChange={(value) => setFieldValue('phone', value)}
              error={
                (touched.phone && Boolean(errors.phone)) ||
                Boolean(phoneNumberErrorMessage && invalidInput)
              }
              helperText={
                touched.phone && errors.phone ? errors.phone : undefined
              }
            />

            <FormHelperText variant="standard" error={invalidInput}>
              {invalidInput ? 'phone number already exist' : ''}
            </FormHelperText>
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
