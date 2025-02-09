import * as Yup from 'yup';

export const GuardianChangePhoneFormSchema = Yup.object().shape({
  isEmailVerified: Yup.boolean().required('Email verification is required'),
  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});
