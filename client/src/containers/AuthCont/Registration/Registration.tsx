import Auth from '@/containers/AuthCont/Auth';
import FormikTF from '@/containers/AuthCont/FormikTF';
import { initialValuesReg, validationSchemaReg } from '@/containers/AuthCont/helpers';
import { IRegister } from '@/interfaces';
import { registerAPI } from '@/store/services/RegisterService';
import SubmitBtn from '@/uikit/SubmitBtn';
import { Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import Avatar from './Avatar';
import Birthdate from './Birthdate';
import styles from './Registration.module.scss';

const formik = [
  { name: 'fullName', type: 'text', label: 'Your username' },
  { name: 'email', type: 'email', label: 'Your email' },
  { name: 'password', type: 'password', label: 'Your password' },
];

const Registration = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [createReg, { isSuccess }] = registerAPI.useCreateRegMutation();
  const { t } = useTranslation();

  const handleChange = async (values: IRegister) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('fullName', values.fullName);
    formData.append('birthDate', values.birthDate);
    formData.append('country', country);
    if (selectedFile) {
      formData.append('avatar', selectedFile, selectedFile.name);
    } else {
      formData.append('avatar', '');
    }
    try {
      await createReg(formData);
    } catch (error) {
      console.error('Registr error:', error);
    }
  };

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64Data = fileReader.result;
        setPreviewUrl(base64Data as string);
      };
      fileReader.readAsDataURL(file);
    }
  }, []);

  if (isSuccess) {
    return <Navigate to={'/signin'} />;
  }

  return (
    <Auth>
      <Formik
        initialValues={initialValuesReg}
        validateOnBlur
        validationSchema={validationSchemaReg}
        onSubmit={handleChange}
      >
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={styles.container}>
            {formik.map(form => (
              <FormikTF key={form.label} name={form.name} type={form.type} label={t(form.label)} />
            ))}
            <div className={styles.countryWrap}>
              <span className={styles.text}>Your country</span>
              <CountryDropdown value={country} onChange={val => setCountry(val)} classes={styles.country} />
            </div>
            <Birthdate value={values.birthDate} onChange={e => setFieldValue('birthDate', e.target.value)} />
            <Avatar previewUrl={previewUrl} onChange={handleFileChange} />
            <SubmitBtn text={t('Send')} disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Auth>
  );
};

export default Registration;
