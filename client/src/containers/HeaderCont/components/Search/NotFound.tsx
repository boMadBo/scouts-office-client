import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.notFound}>
      <h2 className={styles.notTitle}>{t('Nothing found')}</h2>
    </div>
  );
};

export default React.memo(NotFound);
