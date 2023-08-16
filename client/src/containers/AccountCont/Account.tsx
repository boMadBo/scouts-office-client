import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Account.module.scss';
import AccountContent from './components/AccountContent';
import Profile from './components/Profile/Profile';
import Timezones from './components/Timezones';
import Weather from './components/Weather/Weather';

const Account = () => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return (
    <main className={styles.wrapper}>
      <Profile />
      <AccountContent />
      <Weather />
      <Timezones />
    </main>
  );
};

export default Account;
