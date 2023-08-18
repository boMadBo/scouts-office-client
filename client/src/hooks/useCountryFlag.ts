import { useEffect, useMemo, useState } from 'react';

export const useCountryFlagUrl = (countryName: string | undefined) => {
  const [flagUrl, setFlagUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchFlagUrl = async () => {
      try {
        if (countryName) {
          const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
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
