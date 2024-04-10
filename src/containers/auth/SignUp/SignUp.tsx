import Wrap from '@/containers/auth/Wrap';
import { initialValuesReg, validationSchemaReg } from '@/containers/auth/helpers';
import { IRegistrationValues } from '@/containers/auth/types';
import { registrationAPI } from '@/store/services/RegistrationService';
import Button from '@/uikit/buttons/Button';
import BirthdateForm from '@/uikit/forms/BirthdateForm';
import ImageDownloader from '@/uikit/forms/ImageDownloader';
import InputForm from '@/uikit/forms/InputForm';
import { Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import styles from './signUp.module.scss';

const formik = [
  { name: 'name', type: 'text', label: 'Your username' },
  { name: 'email', type: 'email', label: 'Your email' },
  { name: 'password', type: 'password', label: 'Your password' },
];

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [country, setCountry] = useState('');
  const [createReg, { isSuccess }] = registrationAPI.useUserRegistrationMutation();
  const { t } = useTranslation();

  const handleChange = async (values: IRegistrationValues) => {
    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('name', values.name);
    formData.append('birthDate', values.birthDate);
    formData.append('country', country);
    if (selectedFile) {
      formData.append('file', selectedFile, selectedFile.name);
    } else {
      formData.append('file', '');
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
    <Wrap>
      <Formik
        initialValues={initialValuesReg}
        validateOnBlur
        validationSchema={validationSchemaReg}
        onSubmit={handleChange}
      >
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={styles.container}>
            {formik.map(form => (
              <InputForm key={form.label} name={form.name} type={form.type} label={t(form.label)} />
            ))}
            <div className={styles.countryWrap}>
              <span className={styles.text}>Your country</span>
              <CountryDropdown value={country} onChange={val => setCountry(val)} classes={styles.country} />
            </div>
            <BirthdateForm value={values.birthDate} onChange={e => setFieldValue('birthDate', e.target.value)} />
            <ImageDownloader previewUrl={previewUrl} onChange={handleFileChange} />
            <Button text={t('Send')} disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </Wrap>
  );
};

export default React.memo(SignUp);
