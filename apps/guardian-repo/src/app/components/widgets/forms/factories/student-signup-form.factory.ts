import * as Yup from 'yup';

export const StudentSignupFormSchema = Yup.object().shape({
  name: Yup.string().max(100, 'Name is too long').required('Name is required'),
  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
});
