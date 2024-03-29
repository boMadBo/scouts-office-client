import { config } from '@/common/config';
import { StartValue } from '@/types/player';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

export const useGetValue = (id: string | undefined) => {
  const [value, setValue] = useState<StartValue[]>([]);

  const fetchData = async () => {
    const url = `${config.transfermarkt.url}/players/get-market-value?id=${id}&domain=com`;
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
      return result.marketValueDevelopment;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setValue(result);
    });
  }, []);

  return useMemo(() => {
    const newDate = value.map(item => {
      const dateObject = dayjs(item.unformattedDate, { format: 'YYYY-MM-DD' });
      return dateObject.format('DD MMM YYYY');
    });

    const result = value.map((item, index) => {
      const date = newDate[index];
      const age = item.age;
      const marketValue = item.marketValue;
      const mValueUnform = item.marketValueUnformatted;
      const mValueCurr = item.marketValueCurrency;
      const mValueNum = item.marketValueNumeral;
      const clubName = item.clubName;
      return {
        date,
        age,
        marketValue,
        mValueUnform,
        mValueCurr,
        mValueNum,
        clubName,
      };
    });

    return result;
  }, [value]);
};
