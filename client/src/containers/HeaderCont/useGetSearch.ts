import { instance } from '@/api/instanceTM';
import { useAppSelector } from '@/hooks';
import { ISearch } from '@/interfaces/search';
import { useEffect, useMemo, useState } from 'react';

export const useGetSearch = (key: string) => {
  const [search, setSearch] = useState<ISearch | undefined>(undefined);
  const query = useAppSelector(state => state.search.query);

  const fetchData = async () => {
    const url = `${instance}/search?query=${query}`;
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
      return result;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setSearch(result);
    });
  }, [query]);

  console.log('search', search);

  return useMemo(() => {
    return search;
  }, [search, query]);
};
