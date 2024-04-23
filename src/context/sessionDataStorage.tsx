import { config } from '@/config';
import { IProfileValues } from '@/containers/account/types';
import { useAppDispatch } from '@/hooks/hooks';
import { deleteRememberMe } from '@/store/reducers/RememberMeSlice';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ISessionContext {
  userData: IProfileValues;
}

const initialUserData: IProfileValues = {
  id: -Infinity,
  email: '',
  name: '',
  avatar: '',
  birthDate: '',
  country: '',
  observations: [],
  token: '',
  refreshToken: '',
  utcZones: [],
};

export const SessionContext = createContext<ISessionContext>({
  userData: initialUserData,
});

const SessionDataStorage = ({ children }: any) => {
  const [userData, setUserData] = useState<IProfileValues>(initialUserData);
  const [currentToken, setCurrentToken] = useState('');
  const lsToken = localStorage.getItem('token');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = currentToken || lsToken;
    if (token) {
      refreshToken(token);
    }
  }, [currentToken, lsToken]);

  const refreshToken = async (token: string) => {
    const refreshResult = await fetch(`${config.api.url}user`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(response => response.json());

    if (refreshResult.statusCode === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('rememberMe');
      dispatch(deleteRememberMe());
      return;
    }
    setUserData(refreshResult);
  };

  useEffect(() => {
    const handleTokenRefresh = (event: CustomEvent<string>) => {
      setCurrentToken(event.detail);
    };
    window.addEventListener('tokenRefreshed', handleTokenRefresh as EventListener);

    return () => {
      window.removeEventListener('tokenRefreshed', handleTokenRefresh as EventListener);
    };
  }, []);

  return <SessionContext.Provider value={{ userData }}>{children}</SessionContext.Provider>;
};

export const useSessionData = () => useContext(SessionContext);

export default SessionDataStorage;
