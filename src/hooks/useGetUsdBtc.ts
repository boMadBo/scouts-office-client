
import { config } from '@/common/config';
import { ICostRatio } from '@/types/player';
import { useEffect, useMemo, useState } from 'react';

export const useGetUsdBtc = () => {
  const [rates, setRates] = useState<ICostRatio | undefined>(undefined);

  const fetchData = async () => {
    const url = `${config.exchange.url}?currency=EUR`;
    const options = {
      method: 'GET',
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.data.rates;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setRates(result);
    });
  }, []);

  return useMemo(() => {
    const extractedData = {
      BTC: rates?.BTC,
      USD: rates?.USD,
    };

    return extractedData;
  }, [rates]);
};
