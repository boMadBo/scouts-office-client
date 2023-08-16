import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
  const token = Cookies.get('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
