import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().optional().typeError('Should be string'),
  password: yup.string().optional().typeError('Should be string'),
  email: yup.string().optional().typeError('Should be string'),
});

export const initialValues = {
  id: '',
  name: '',
  password: '',
  email: '',
  avatar: null,
};
