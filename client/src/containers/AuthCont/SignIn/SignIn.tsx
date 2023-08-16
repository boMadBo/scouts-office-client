<<<<<<< HEAD
import Auth from '@/containers/AuthCont/Auth';
import { initialValuesSign, validationSchemaSign } from '@/containers/AuthCont/helpers';
import { useAppDispatch } from '@/hooks';
import { ISignInValues } from '@/interfaces';
import { fetchSaveToken } from '@/store/reducers/TokenSlice';
import { profileAPI } from '@/store/services/ProfileService';
import Loading from '@/uikit/Loading';
import SubmitBtn from '@/uikit/SubmitBtn';
import FormikTF from '@/uikit/TextField/FormikTF';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import styles from './SignIn.module.scss';

const formik = [
  { name: 'email', type: 'email', label: 'Your email' },
  { name: 'password', type: 'password', label: 'Your password' },
];

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [createSignIn, { isSuccess, data, isLoading }] = profileAPI.useCreateSignInMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
=======
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
>>>>>>> 8673b67 (add server and start auth)

  const handleChange = async (values: ISignInValues) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    try {
      const response = await createSignIn(values);
<<<<<<< HEAD

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

=======
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

>>>>>>> 8673b67 (add server and start auth)
  if (isSuccess) {
    return <Navigate to={'/account'} />;
  }

  if (isLoading) {
<<<<<<< HEAD
    return <Loading />;
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
            <div className={styles.btnWrap}>
              <div className={styles.checkbox}>
                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                <label htmlFor="" className={styles.text}>
                  {t('Remember me')}
                </label>
              </div>
              <SubmitBtn text={t('Send')} disabled={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </Auth>
  );
};

export default React.memo(SignIn);
=======
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
>>>>>>> 8673b67 (add server and start auth)
