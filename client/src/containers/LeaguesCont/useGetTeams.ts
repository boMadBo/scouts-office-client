import { instance } from '@/api/instanceTM';
import { Team } from '@/interfaces';
import { useEffect, useMemo, useState } from 'react';

export const useGetTeams = (id: string | undefined, key: string) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchData = async () => {
    const url = `${instance}/competitions/get-table?id=${id}&seasonID=2023&domain=com`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.table;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setTeams(result);
    });
  }, []);

  const memoizedTeams = useMemo(() => teams, [teams]);

  return memoizedTeams;
};
