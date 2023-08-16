<<<<<<< HEAD
import { instance } from '@/api/instanceIP';
import { instanceLoc } from '@/api/instanceLoc';
=======
import { instanceIP } from '@/api/instanceIP';
>>>>>>> 8673b67 (add server and start auth)
import { useEffect, useMemo, useState } from 'react';

export const useGetLocation = (token: string) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

<<<<<<< HEAD
  const fetchData = async () => {
    try {
      const ipUrl = instance;
      const responseIP = await fetch(ipUrl);
      const dataIP = await responseIP.json();
      const myIP = dataIP.ip;

      const locationUrl = `${instanceLoc}/${myIP}?token=${token}`;
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
  useEffect(() => {
    fetchData();
  }, []);
=======
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ipUrl = instanceIP;
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
>>>>>>> 8673b67 (add server and start auth)

  return useMemo(() => ({ latitude, longitude }), [latitude, longitude]);
};
