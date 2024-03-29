import Timezones from '@/containers/account/Timezones';
import Weather from '@/containers/account/Weather/Weather';
import { useSessionData } from '@/context/sessionDataStorage';
import Loading from '@/uikit/Loading';
import ParentLink from '@/uikit/links/ParentLink';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import Profile from './Profile/Profile';
import styles from './account.module.scss';

const routes = [
  { link: 'todo', text: 'To-do list' },
  { link: 'observe', text: 'Observe list' },
];

const headLink = '/account';

const Account = () => {
  const { userData } = useSessionData();
  const { t } = useTranslation();

  if (!userData.token) {
    return <Loading />;
  }

  return (
    <section className={styles.wrapper}>
      <Profile />
      <div className={styles.contentContainer}>
        <div className={styles.containerGroup}>
          <div className={styles.routesGroup}>
            {routes.map(route => (
              <ParentLink key={route.link} to={`${headLink}/${route.link}`} fontSize="fs16" content={true}>
                {t(route.text)}
              </ParentLink>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
      <Weather />
      <Timezones />
    </section>
  );
};

export default Account;
