import Auth from '@/containers/AuthCont/Auth';
import FormikTF from '@/containers/AuthCont/FormikTF';
import { initialValuesSign, validationSchemaSign } from '@/containers/AuthCont/helpers';
import { useAppDispatch } from '@/hooks';
import { ISignInValues } from '@/interfaces';
import { fetchSaveToken } from '@/store/reducers/TokenSlice';
import { signInAPI } from '@/store/services/SignInService';
import SubmitBtn from '@/uikit/SubmitBtn';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import styles from './SignIn.module.scss';

const formik = [
  { name: 'email', type: 'email', label: 'Your email' },
  { name: 'password', type: 'password', label: 'Your password' },
];

const SignIn = () => {
  const [createSignIn, { isSuccess, data, isLoading }] = signInAPI.useCreateSignInMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleChange = async (values: ISignInValues) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    try {
      const response = await createSignIn(values);
      const hasData = 'data' in response;
      if (hasData) {
        const token = response.data.token;
        if (token) {
          Cookies.set('token', token, { expires: 365 });
          dispatch(fetchSaveToken());
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
    <Auth>
      <Formik
        initialValues={initialValuesSign}
        validateOnBlur
        validationSchema={validationSchemaSign}
        onSubmit={handleChange}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={styles.container}>
            {formik.map(form => (
              <FormikTF key={form.label} name={form.name} type={form.type} label={t(form.label)} />
            ))}
            <SubmitBtn text={t('Send')} disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Auth>
  );
};

export default SignIn;
