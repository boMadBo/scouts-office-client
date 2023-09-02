<<<<<<< HEAD
<<<<<<< HEAD
import { instance } from '@/api/instanceUsdBtc';
=======
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
import { instance } from '@/api/instanceUsdBtc';
>>>>>>> 7e204e8 (toggle observe)
import { Rates } from '@/interfaces';
import { useEffect, useMemo, useState } from 'react';

export const useGetUsdBtc = () => {
  const [rates, setRates] = useState<Rates | undefined>(undefined);

  const fetchData = async () => {
<<<<<<< HEAD
<<<<<<< HEAD
    const url = `${instance}?currency=EUR`;
=======
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=EUR`;
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
    const url = `${instance}?currency=EUR`;
>>>>>>> 7e204e8 (toggle observe)
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
