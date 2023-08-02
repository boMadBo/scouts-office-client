import AuthWrap from '@/containers/auth/AuthWrap';
import { initialValuesSign, validationSchemaSign } from '@/containers/auth/helpers';
import { useAppDispatch } from '@/hooks';
import { fetchSaveToken } from '@/store/reducers/TokenSlice';
import { profileAPI } from '@/store/services/ProfileService';
import Loading from '@/uikit/Loading';
import Button from '@/uikit/buttons/Button';
import InputForm from '@/uikit/forms/InputForm';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import styles from './signIn.module.scss';
import { ISignInValues } from '@/containers/auth/types';

const formik = [
  { name: 'email', type: 'email', label: 'Your email' },
  { name: 'password', type: 'password', label: 'Your password' },
];

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [createSignIn, { isSuccess, data, isLoading }] = profileAPI.useCreateSignInMutation();
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
          Cookies.set('token', token, { expires: 30 });
          dispatch(fetchSaveToken());
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleRememberMeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setRememberMe(checked);
    Cookies.set('rememberMe', checked.toString(), { expires: 30 });
  }, []);

  if (isSuccess) {
    return <Navigate to={'/account'} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthWrap>
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
                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                <label htmlFor="" className={styles.text}>
                  {t('Remember me')}
                </label>
              </div>
              <Button text={t('Send')} disabled={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </AuthWrap>
  );
};

export default React.memo(SignIn);
