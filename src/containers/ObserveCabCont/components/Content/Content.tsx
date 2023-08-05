import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Content.module.scss';

const Content = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.contentContainer}>
      <div className={styles.title}>{t('To-do list')}</div>
      <div className={styles.title}>{t('Observe list')}</div>
    </section>
  );
};

export default React.memo(Content);
