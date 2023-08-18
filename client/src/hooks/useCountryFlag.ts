<<<<<<< HEAD
import { instance } from '@/api/instanceFlag';
=======
>>>>>>> 266d9e0 (add profile editor)
import { useEffect, useMemo, useState } from 'react';

export const useCountryFlagUrl = (countryName: string | undefined) => {
  const [flagUrl, setFlagUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchFlagUrl = async () => {
      try {
        if (countryName) {
<<<<<<< HEAD
          const response = await fetch(`${instance}/${countryName}`);
=======
          const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
>>>>>>> 266d9e0 (add profile editor)
          const data = await response.json();
          const url = data[0]?.flags.svg;
          setFlagUrl(url);
        }
      } catch (error) {
        console.error('Error fetching country flag:', error);
        setFlagUrl(undefined);
      }
    };

    fetchFlagUrl();
  }, [countryName]);

  const memoizedFlagUrl = useMemo(() => flagUrl, [flagUrl]);

  return memoizedFlagUrl;
};
