import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './HeaderCont/Header';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer style={{ color: 'var(--main-text)' }}>its footer</footer>
    </>
  );
};

export default Layout;