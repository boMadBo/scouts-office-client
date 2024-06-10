import { config } from '@/config';
import { IProfileValues } from '@/containers/account/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ISessionContext {
  userData: IProfileValues | undefined;
}

export const SessionContext = createContext<ISessionContext>({
  userData: undefined,
});

const SessionDataStorage = ({ children }: any) => {
  const [userData, setUserData] = useState<IProfileValues | undefined>(undefined);
  const [currentToken, setCurrentToken] = useState('');

  const refreshToken = async (token: string) => {
    const refreshResult = await fetch(`${config.api.url}user`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(response => response.json());

    setUserData(refreshResult);
  };

  useEffect(() => {
    if (currentToken) {
      refreshToken(currentToken);
    }
  }, [currentToken]);

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
