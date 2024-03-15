import * as yup from 'yup';

export const validationSchemaReg = yup.object().shape({
  name: yup.string().typeError('Should be string').required('Please input your username'),
  password: yup.string().typeError('Should be string').required('Please input your password'),
  birthDate: yup.date().typeError('Should be a date').required('Please input your date of birth'),
  email: yup
    .string()
    .typeError('Should be string')
    .email('Please input a valid email')
    .required('Please input your email'),
});

export const initialValuesReg = {
  name: '',
  password: '',
  birthDate: '',
  email: '',
  avatar: null,
  country: '',
};

export const validationSchemaSign = yup.object().shape({
  email: yup
    .string()
    .typeError('Should be string')
    .email('Please input a valid email')
    .required('Please input your email'),
  password: yup.string().typeError('Should be string').required('Please input your password'),
});

export const initialValuesSign = {
  email: '',
  password: '',
};
