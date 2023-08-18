<<<<<<< HEAD
import Loading from '@/uikit/Loading';
=======
>>>>>>> 8673b67 (add server and start auth)
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

<<<<<<< HEAD
  if (!token) {
    return <Loading />;
  }

  return (
    <section className={styles.wrapper}>
=======
  return (
<<<<<<< HEAD
    <main className={styles.wrapper}>
>>>>>>> 8673b67 (add server and start auth)
=======
    <section className={styles.wrapper}>
>>>>>>> 266d9e0 (add profile editor)
      <Profile />
      <AccountContent />
      <Weather />
      <Timezones />
<<<<<<< HEAD
<<<<<<< HEAD
    </section>
=======
    </main>
>>>>>>> 8673b67 (add server and start auth)
=======
    </section>
>>>>>>> 266d9e0 (add profile editor)
  );
};

export default Account;
