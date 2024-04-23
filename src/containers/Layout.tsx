import Footer from '@/containers/footer';
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
      <Footer />
    </main>
  );
};

export default Layout;
