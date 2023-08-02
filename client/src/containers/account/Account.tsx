import Loading from '@/uikit/Loading';
import Timezones from '@/containers/account/Timezones';
import Weather from '@/containers/account/Weather/Weather';
import ParentLink from '@/uikit/links/ParentLink';
import Cookies from 'js-cookie';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';
import styles from './account.module.scss';
import Profile from './Profile/Profile';

const routes = [
  { link: 'todo', text: 'To-do list' },
  { link: 'observe', text: 'Observe list' },
];

const headLink = '/account';

const Account = () => {
  const token = Cookies.get('token');
  const { t } = useTranslation();

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  if (!token) {
    return <Loading />;
  }

  return (
    <section className={styles.wrapper}>
      <Profile />
      <div className={styles.contentContainer}>
        <div className={styles.containerGroup}>
          <div className={styles.routesGroup}>
            {routes.map(route => (
              <ParentLink key={route.link} to={`${headLink}/${route.link}`} fontSize='fs16' content={true}>
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
