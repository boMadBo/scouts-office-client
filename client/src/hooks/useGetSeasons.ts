import { config } from '@/common/config';
import { Seasons } from '@/types/player';
import { useEffect, useMemo, useState } from 'react';

export const useGetSeasons = (id: string | undefined) => {
  const [seasons, setSeasons] = useState<Seasons[]>([]);

  const fetchData = async () => {
    const url = `${config.transfermarkt.url}/players/get-performance-summary?id=${id}&domain=com`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': config.transfermarkt.key,
        'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.seasons;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setSeasons(result);
    });
  }, []);

  return useMemo(() => {
    return seasons;
  }, [seasons]);
};
