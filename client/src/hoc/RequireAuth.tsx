<<<<<<< HEAD
import { useAppSelector } from '@/hooks';
=======
import Cookies from 'js-cookie';
>>>>>>> 8673b67 (add server and start auth)
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
<<<<<<< HEAD
  const isToken = useAppSelector(state => state.token.isToken);
  const location = useLocation();

  if (!isToken) {
=======
  const token = Cookies.get('token');
  const location = useLocation();

  if (!token) {
>>>>>>> 8673b67 (add server and start auth)
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
