import { instanceIP } from '@/api/instanceIP';
import { useEffect, useMemo, useState } from 'react';

export const useGetLocation = (token: string) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ipUrl = instanceIP;
        const response1 = await fetch(ipUrl);
        const data1 = await response1.json();
        const myIP = data1.ip;

        const locationUrl = `https://ipinfo.io/${myIP}?token=${token}`;
        const response2 = await fetch(locationUrl);
        const data2 = await response2.json();

        const lat = Number(data2.loc.split(',')[0]);
        const long = Number(data2.loc.split(',')[1]);

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
