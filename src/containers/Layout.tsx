import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import styles from './layout.module.scss';

const Layout = () => {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.layout}>
        <Outlet />
      </section>
      <footer style={{ color: 'var(--main-text)', height: '20px' }}>its footer</footer>
    </main>
  );
};

export default Layout;
