import React from 'react';
import styles from './Account.module.scss';
import AccountContent from './components/AccountContent';
import Profile from './components/Profile/Profile';
import Timezones from './components/Timezones';
import Weather from './components/Weather/Weather';

const Account = () => {
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
