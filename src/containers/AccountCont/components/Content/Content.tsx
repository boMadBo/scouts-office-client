import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import styles from './Content.module.scss';

const Content = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.contentContainer}>
      <Link to="todo" className={styles.title}>
        {t('To-do list')}
      </Link>
      <Link to="observe" className={styles.title}>
        {t('Observe list')}
      </Link>

      <Outlet />
    </section>
  );
};

export default React.memo(Content);
