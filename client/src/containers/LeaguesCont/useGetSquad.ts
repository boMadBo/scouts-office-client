import { instance } from '@/api/instanceTM';
import { StartSquad } from '@/interfaces/squads';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { sortPositions } from './utils';

export const useGetSquad = (id: string | undefined, key: string) => {
  const [squad, setSquad] = useState<StartSquad[]>([]);

  const fetchData = async () => {
    const url = `${instance}/clubs/get-squad?id=${id}&saison_id=2023&domain=com`;
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
      return result.squad;
    } catch (error) {
      console.error(error);
      return 'Error fetching data';
    }
  };

  useEffect(() => {
    fetchData().then(result => {
      setSquad(result);
    });
  }, []);

  return useMemo(() => {
    const formatMonth = (month: string) => {
      if (month.length > 4) {
        return month.slice(0, 3) + '.';
      }
      return month;
    };

    const resultDate = (timestamp: number) => {
      const formattedDate = dayjs.unix(timestamp).format('DD MMMM YYYY');
      const formattedMonth = formatMonth(formattedDate.split(' ')[1]);
      const finalFormattedDate = formattedDate.replace(formattedDate.split(' ')[1], formattedMonth);
      return finalFormattedDate;
    };

    const resultValue = (value: number) => {
      let res = value.toString();
      if (res.length >= 7) {
        res = res.slice(0, -6) + ',' + res.slice(-6, -4) + ' ' + 'm';
      } else {
        res = res.slice(0, -3) + ' ' + 'k';
      }
      return res;
    };

    const result = squad.map(item => {
      const id = item.id;
      const shirtNumber = item.shirtNumber;
      const image = item.image;
      const name = item.name;
      const dateOfBirth = resultDate(item.dateOfBirth);
      const age = item.age;
      const positionGroup = item.positions.first.group;
      const positionFull = item.positions.first.name;
      const positionShort = item.positions.first.shortName;
      const flag = item.nationalities[0].image;
      const value = resultValue(item.marketValue.value) + ' ' + item.marketValue.currency;
      return {
        id,
        shirtNumber,
        image,
        name,
        dateOfBirth,
        age,
        positionGroup,
        positionFull,
        positionShort,
        flag,
        value,
      };
    });

    return sortPositions(result);
  }, [squad]);
};
