import ProfileEditor from '@/containers/account/ProfileEditor';
import Timezones from '@/containers/account/Timezones';
import Weather from '@/containers/account/Weather/Weather';
import { useSessionData } from '@/context/sessionDataStorage';
import Loading from '@/uikit/Loading';
import ParentLink from '@/uikit/links/ParentLink';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import MainInfo from './MainInfo';
import styles from './account.module.scss';

const routes = [
  { link: 'todo', text: 'To-do list' },
  { link: 'observe', text: 'Observe list' },
];

const headLink = '/account';

const Account = () => {
  const { userData } = useSessionData();
  const [editting, setEditting] = useState(false);
  const { t } = useTranslation();

  const toggleEditting = useCallback(() => {
    setEditting(!editting);
  }, [editting]);

  if (!userData.token) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <MainInfo onClick={toggleEditting} />
      {!editting && (
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
      )}
      {editting && (
        <div className={styles.contentContainer}>
          <ProfileEditor toggleEditting={toggleEditting} />
        </div>
      )}

      <Weather />
      <Timezones />
    </div>
  );
};

export default Account;
