import { profileAPI } from '@/store/services/ProfileService';
import Button from '@/uikit/buttons/Button';
import InputForm from '@/uikit/forms/InputForm';
import PhotoDownloader from '@/uikit/forms/PhotoDownloader';
import { Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './editProfile.module.scss';
import { initialValues, validationSchema } from './helpers';
import { IProfileUpdateValues } from '@/types/account';

const formik = [
  { name: 'fullName', type: 'text', label: 'Your username' },
  { name: 'email', type: 'email', label: 'Your email' },
  { name: 'password', type: 'password', label: 'Your password' },
];

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data } = profileAPI.useGetProfileQuery();
  const [updateProfile] = profileAPI.useUpdateProfileMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goBack = () => navigate(-1);

  const handleChange = async (values: IProfileUpdateValues) => {
    const formData = new FormData();
    formData.append('password', values.password);
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    if (selectedFile) {
      formData.append('avatar', selectedFile, selectedFile.name);
    } else {
      formData.append('avatar', '');
    }
    try {
      if (data?._id) {
        await updateProfile({ formData, _id: data._id });
        goBack();
      }
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

  return (
    <section className={styles.editProfile}>
      <Formik initialValues={initialValues} validateOnBlur validationSchema={validationSchema} onSubmit={handleChange}>
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={styles.container}>
            {formik.map(form => (
              <InputForm key={form.label} name={form.name} type={form.type} label={t(form.label)} />
            ))}
            <PhotoDownloader previewUrl={previewUrl} onChange={handleFileChange} />
            <Button text={t('Send')} disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EditProfile;
