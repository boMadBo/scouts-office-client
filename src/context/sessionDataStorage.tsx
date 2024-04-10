import { IProfileValues } from '@/containers/account/types';
import { profileAPI } from '@/store/services/ProfileService';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ISessionContext {
  userData: IProfileValues;
  setUserData: React.Dispatch<React.SetStateAction<IProfileValues>>;
}

const initialUserData: IProfileValues = {
  id: -1,
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
  setUserData: () => {},
});

const SessionDataStorage = ({ children }: any) => {
  const user = profileAPI.useGetProfileQuery();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState<IProfileValues>(initialUserData);

  useEffect(() => {
    if (token) {
      user.refetch();
    }
  }, [token]);

  useEffect(() => {
    if (user.data) {
      setUserData(user.data);
    }
  }, [user.data]);

  return <SessionContext.Provider value={{ userData, setUserData }}>{children}</SessionContext.Provider>;
};

export const useSessionData = () => useContext(SessionContext);

export default SessionDataStorage;
