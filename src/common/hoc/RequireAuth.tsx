import { useAppSelector } from '@/common/hooks/hooks';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
  const isRememberMe = useAppSelector(state => state.rememberMe.isRememberMe);
  const location = useLocation();

  if (!isRememberMe) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
