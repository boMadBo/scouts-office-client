import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ObserveCab.module.scss';

const ObserveCab = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.wrapper}>
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
      <section className={styles.contentContainer}>
        <div className={styles.title}>{t('To-do list')}</div>
        <div className={styles.title}>{t('Observe list')}</div>
        <div className={styles.clockWrap}>Time</div>
      </section>
    </main>
  );
};

export default ObserveCab;
