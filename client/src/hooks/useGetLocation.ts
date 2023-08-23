import { instance } from '@/api/instanceIP';
import { useEffect, useMemo, useState } from 'react';

export const useGetLocation = (token: string) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ipUrl = instance;
        const responseIP = await fetch(ipUrl);
        const dataIP = await responseIP.json();
        const myIP = dataIP.ip;

        const locationUrl = `https://ipinfo.io/${myIP}?token=${token}`;
        const responseLoc = await fetch(locationUrl);
        const dataLoc = await responseLoc.json();

        const lat = Number(dataLoc.loc.split(',')[0]);
        const long = Number(dataLoc.loc.split(',')[1]);

        setLatitude(lat);
        setLongitude(long);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [token]);

  return useMemo(() => ({ latitude, longitude }), [latitude, longitude]);
};
