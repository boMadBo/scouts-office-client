<<<<<<< HEAD
<<<<<<< HEAD
import { instance } from '@/api/instanceIP';
import { instanceLoc } from '@/api/instanceLoc';
<<<<<<< HEAD
=======
import { instanceIP } from '@/api/instanceIP';
>>>>>>> 8673b67 (add server and start auth)
=======
import { instance } from '@/api/instanceIP';
>>>>>>> 431f668 (dev leagues)
=======
>>>>>>> dfd4232 (create squad page)
import { useEffect, useMemo, useState } from 'react';

export const useGetLocation = (token: string) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dfd4232 (create squad page)
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
<<<<<<< HEAD
  useEffect(() => {
    fetchData();
  }, []);
=======
=======
>>>>>>> dfd4232 (create squad page)
  useEffect(() => {
    fetchData();
<<<<<<< HEAD
  }, [token]);
>>>>>>> 8673b67 (add server and start auth)
=======
  }, []);
>>>>>>> dfd4232 (create squad page)

  return useMemo(() => ({ latitude, longitude }), [latitude, longitude]);
};
