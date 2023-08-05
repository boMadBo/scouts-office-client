import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Profile.module.scss';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.profileConteiner}>
      <div className={styles.infoWrapper}>
        <span className={styles.title}>{t('My profile')}</span>
        <div className={styles.photoWrapper}>Photo</div>
        <div className={styles.title}>Name</div>
        <div className={styles.ageWrap}>
          <div className={styles.title}>{t('Age')}</div>
          <div className={styles.title}>{t('Country')}</div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Profile);
