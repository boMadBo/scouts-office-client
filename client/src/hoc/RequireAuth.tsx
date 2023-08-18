import { useAppSelector } from '@/hooks';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
  const isToken = useAppSelector(state => state.token.isToken);
  const location = useLocation();

  if (!isToken) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
