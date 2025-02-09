import { Box, Button, FormHelperText } from '@mui/material';
import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { VALIDATION_SCHEMA } from './resources/validation';
import { INITIAL_VALUES } from './resources/values.init';
import { MuiTelInput } from 'mui-tel-input';
import { Props } from './resources/types';

export const AuthenticationFormViaPhoneNumberWidget: FC<Props> = ({
  submit,
  message,
  defaultPhone = '',
  btnTxt = 'placeholder',
  regionCode,
  error,
}): React.JSX.Element => {
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
        initialValues={Object.assign(INITIAL_VALUES, { phone: defaultPhone })}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={submit}
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
              defaultCountry={regionCode}
              variant="outlined"
              value={values.phone}
              forceCallingCode
              onChange={(value) => setFieldValue('phone', value)}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <FormHelperText variant="standard" error={error}>
              {message}
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
