import { initialValues, validationSchema } from '@/containers/account/helpers';
import { IProfileUpdateValues } from '@/containers/account/types';
import { profileAPI } from '@/store/services/ProfileService';
import Button from '@/uikit/buttons/Button';
import ImageDownloader from '@/uikit/forms/ImageDownloader';
import InputForm from '@/uikit/forms/InputForm';
import { Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './profileEditor.module.scss';

interface Props {
  toggleEditting: () => void;
}

const formik = [
  { name: 'name', type: 'text', label: 'Your username' },
  { name: 'email', type: 'email', label: 'Your email' },
  { name: 'password', type: 'password', label: 'Your password' },
];

const ProfileEditor = ({ toggleEditting }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [updateProfile] = profileAPI.useUpdateProfileMutation();
  const { t } = useTranslation();

  const handleChange = async (values: IProfileUpdateValues) => {
    const formData = new FormData();
    if (values.password) {
      formData.append('password', values.password);
    }
    if (values.name) {
      formData.append('name', values.name);
    }
    if (values.email) {
      formData.append('email', values.email);
    }
    if (selectedFile) {
      formData.append('file', selectedFile, selectedFile.name);
    } 
    try {
      await updateProfile({ formData });
      toggleEditting();
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
            <ImageDownloader previewUrl={previewUrl} onChange={handleFileChange} />
            <Button text={t('Send')} disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ProfileEditor;
