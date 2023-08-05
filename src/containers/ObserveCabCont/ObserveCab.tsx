import React from 'react';
import styles from './ObserveCab.module.scss';
import Content from './components/Content/Content';
import Profile from './components/Profile/Profile';
import Timezones from './components/Timezones';

const ObserveCab = () => {
  return (
    <main className={styles.wrapper}>
      <Profile />
      <Content />
      <Timezones />
    </main>
  );
};

export default ObserveCab;
