import React, { FC, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { MuiTelInput } from 'mui-tel-input';
import geoService from '../../../providers/api/geo/geo.service';
import { GuardianSignupStudentSessionStartOtpSmsDto } from '../../../providers/api/auth/dto/guardian-signup-student-start-session-otp-via-sms.dto';
import { useOnMount } from '../../../hooks/useOnMount.hook';
import { StudentSignupFormSchema } from './factories/student-signup-form.factory';

interface GuardianSignupStudentFormProps {
  submitForm: (
    dto: GuardianSignupStudentSessionStartOtpSmsDto
  ) => Promise<void>;
  phone: string;
  name: string;
}

const GuardianSignupStudentForm: FC<GuardianSignupStudentFormProps> = ({
  submitForm,
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
    phone: '',
    name: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const { phone, name } = values;
    await submitForm({
      name: name,
      phone: phone,
    });
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
      <Typography textAlign={'center'} variant="h1" component="h1">
        {'Sign Up Student'}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={StudentSignupFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            {/* Name */}
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              id="name"
              name="name"
              label="Student Name"
              value={values.name}
              variant="outlined"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            {/* Phone Number with Country Code */}
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
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              {'Sign Up Student'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default GuardianSignupStudentForm;
