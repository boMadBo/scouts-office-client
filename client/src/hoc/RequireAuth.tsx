<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useAppSelector } from '@/hooks';
=======
import Cookies from 'js-cookie';
>>>>>>> 8673b67 (add server and start auth)
=======
import { useAppSelector } from '@/hooks';
>>>>>>> bda062a (edit server for ts)
=======
import { useAppSelector } from '@/hooks';
>>>>>>> main
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
  const isToken = useAppSelector(state => state.token.isToken);
  const location = useLocation();

  if (!isToken) {
<<<<<<< HEAD
=======
  const token = Cookies.get('token');
  const location = useLocation();

  if (!token) {
>>>>>>> 8673b67 (add server and start auth)
=======
  const isToken = useAppSelector(state => state.token.isToken);
  const location = useLocation();

  if (!isToken) {
>>>>>>> bda062a (edit server for ts)
=======
>>>>>>> main
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
