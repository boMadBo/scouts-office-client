import React from 'react';
import styles from './Account.module.scss';
import Content from './components/Content/Content';
import Profile from './components/Profile/Profile';
import Timezones from './components/Timezones';
import Weather from './components/Weather/Weather';

const Account = () => {
  return (
    <main className={styles.wrapper}>
      <Profile />
      <Content />
      <Weather />
      <Timezones />
    </main>
  );
};

export default Account;
