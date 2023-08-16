import FormikTF from '@/containers/AuthCont/FormikTF';
import { ISignInValues } from '@/interfaces';
import { signInAPI } from '@/store/services/SignInService';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { initialValues, validationSchema } from './helpers';

const SignIn = () => {
  const [createSignIn, { isSuccess, data, isLoading }] = signInAPI.useCreateSignInMutation();

  const handleChange = async (values: ISignInValues) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    try {
      const response = await createSignIn(values);
      if (data && data.token) {
        console.log('test', data.token);
      }

      if ('data' in response) {
        const token = response.data.token;
        if (token) {
          Cookies.set('token', token, { expires: 365 });
        }
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };

  if (isSuccess) {
    return <Navigate to={'/account'} />;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <section>
      <Formik initialValues={initialValues} validateOnBlur validationSchema={validationSchema} onSubmit={handleChange}>
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FormikTF name="email" type="email" label="Your email" />
            <FormikTF name="password" type="password" label="Your password" />
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SignIn;
