import ContentLink from '@/uikit/ContentLink';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import styles from './AccountContent.module.scss';

const routes = [
  { link: 'todo', text: 'To-do list' },
  { link: 'observe', text: 'Observe list' },
];

<<<<<<< HEAD
const HEAD_LINK = '/account';
=======
const headLink = '/account';
>>>>>>> 8673b67 (add server and start auth)

const AccountContent = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.contentContainer}>
      <div className={styles.containerGroup}>
        <div className={styles.routesGroup}>
<<<<<<< HEAD
<<<<<<< HEAD
          {routes.map(route => (
            <ContentLink key={route.link} to={`${HEAD_LINK}/${route.link}`}>
=======
          {routes.map((route) => (
=======
          {routes.map(route => (
>>>>>>> 266d9e0 (add profile editor)
            <ContentLink key={route.link} to={`${headLink}/${route.link}`}>
>>>>>>> 8673b67 (add server and start auth)
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
