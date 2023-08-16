import { profileAPI } from '@/store/services/ProfileService';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Profile.module.scss';

const Profile = () => {
  const { t } = useTranslation();
  const { data } = profileAPI.useGetProfileQuery();

  return (
    <section className={styles.profileConteiner}>
      <div className={styles.infoWrapper}>
        <span className={styles.title}>{t('My profile')}</span>
        <div className={styles.photoWrapper}>
          <img src={data?.avatarUrl} alt="avatar" className={styles.photo} />
        </div>
        <div className={styles.ageWrap}>
          <div className={styles.title}>{t('Age')}</div>
          <span>{data?.fullName}</span>
          <div className={styles.title}>{t('Country')}</div>
          <span>{data?.country}</span>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Profile);
