import Wrap from '@/containers/auth/Wrap';
import { initialValuesSign, validationSchemaSign } from '@/containers/auth/helpers';
import { ISignInValues } from '@/containers/auth/types';
import { useAppDispatch } from '@/hooks/hooks';
import { saveRememberMe } from '@/store/reducers/RememberMeSlice';
import { profileAPI } from '@/store/services/ProfileService';
import Loading from '@/uikit/Loading';
import Button from '@/uikit/buttons/Button';
import InputForm from '@/uikit/forms/InputForm';
import { Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import styles from './signIn.module.scss';

const formik = [
  { name: 'email', type: 'email', label: 'Your email' },
  { name: 'password', type: 'password', label: 'Your password' },
];

const SignIn = () => {
  const [createSignIn, { isSuccess, isLoading }] = profileAPI.useSignInMutation();
  const dispatch = useAppDispatch();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleChange = async (values: ISignInValues) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    try {
      const response = await createSignIn(values);
      const hasData = 'data' in response;

      if (hasData) {
        const token = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        if (token) {
          window.dispatchEvent(new CustomEvent('tokenRefreshed', { detail: token }));
          localStorage.setItem('token', token);
        }
        dispatch(saveRememberMe());
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleRememberMe = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setRememberMe(checked);
    localStorage.setItem('rememberMe', checked.toString());
  }, []);

  if (isSuccess) {
    return <Navigate to={'/account'} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrap>
      <Formik
        initialValues={initialValuesSign}
        validateOnBlur
        validationSchema={validationSchemaSign}
        onSubmit={handleChange}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={styles.container}>
            {formik.map(form => (
              <InputForm key={form.label} name={form.name} type={form.type} label={t(form.label)} />
            ))}
            <div className={styles.btnWrap}>
              <div className={styles.checkbox}>
                <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} />
                <label htmlFor="" className={styles.text}>
                  {t('Remember me')}
                </label>
              </div>
              <Button text={t('Send')} disabled={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </Wrap>
  );
};

export default React.memo(SignIn);
