import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import styles from './layout.module.scss';

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
