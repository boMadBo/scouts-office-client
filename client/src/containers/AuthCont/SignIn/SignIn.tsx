<<<<<<< HEAD
<<<<<<< HEAD
import Auth from '@/containers/AuthCont/Auth';
<<<<<<< HEAD
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
=======
import Auth from '@/containers/AuthCont/Auth';
>>>>>>> bc9de08 (add styles for auth)
import FormikTF from '@/containers/AuthCont/FormikTF';
=======
>>>>>>> 266d9e0 (add profile editor)
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
<<<<<<< HEAD
  const [createSignIn, { isSuccess, data, isLoading }] = signInAPI.useCreateSignInMutation();
<<<<<<< HEAD
>>>>>>> 8673b67 (add server and start auth)
=======
=======
  const [createSignIn, { isSuccess, data, isLoading }] = profileAPI.useCreateSignInMutation();
>>>>>>> 431f668 (dev leagues)
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
>>>>>>> bc9de08 (add styles for auth)

  const handleChange = async (values: ISignInValues) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    try {
      const response = await createSignIn(values);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 431f668 (dev leagues)

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
<<<<<<< HEAD
  }, []);

=======
      if (data && data.token) {
        console.log('test', data.token);
      }

      if ('data' in response) {
=======
      const hasData = 'data' in response;
      if (hasData) {
>>>>>>> bc9de08 (add styles for auth)
        const token = response.data.token;
        if (token) {
          Cookies.set('token', token, { expires: 365 });
          dispatch(fetchSaveToken());
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8673b67 (add server and start auth)
=======
  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
=======
  const handleRememberMeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> 266d9e0 (add profile editor)
    const checked = event.target.checked;
    setRememberMe(checked);
    Cookies.set('rememberMe', checked.toString(), { expires: 365 });
=======
>>>>>>> a40623b (add messages logic)
  }, []);

>>>>>>> bda062a (edit server for ts)
  if (isSuccess) {
    return <Navigate to={'/account'} />;
  }

  if (isLoading) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 80f6534 (add season select)
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

<<<<<<< HEAD
export default SignIn;
>>>>>>> 8673b67 (add server and start auth)
=======
export default React.memo(SignIn);
>>>>>>> dfd4232 (create squad page)
