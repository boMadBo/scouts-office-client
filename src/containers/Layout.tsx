import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './HeaderCont/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>its footer</footer>
    </>
  );
};

export default Layout;
