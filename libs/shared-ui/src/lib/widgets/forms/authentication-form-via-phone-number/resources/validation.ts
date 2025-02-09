import * as Yup from 'yup';

export const VALIDATION_SCHEMA = Yup.object().shape({
  type: Yup.mixed().oneOf(['guardian', 'student'] as const),
  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
});
