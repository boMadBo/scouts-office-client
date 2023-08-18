import ContentLink from '@/uikit/ContentLink';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import styles from './AccountContent.module.scss';

const routes = [
  { link: 'todo', text: 'To-do list' },
  { link: 'observe', text: 'Observe list' },
];

const headLink = '/account';

const AccountContent = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.contentContainer}>
      <div className={styles.containerGroup}>
        <div className={styles.routesGroup}>
          {routes.map(route => (
            <ContentLink key={route.link} to={`${headLink}/${route.link}`}>
              {t(route.text)}
            </ContentLink>
          ))}
        </div>
      </div>
      <section className={styles.content}>
        <Outlet />
      </section>
    </section>
  );
};

export default React.memo(AccountContent);
