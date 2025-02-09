import * as Yup from 'yup';

export const SignupFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, 'First name is too long')
    .required('First name is required'),
  lastName: Yup.string()
    .max(50, 'Last name is too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
});
