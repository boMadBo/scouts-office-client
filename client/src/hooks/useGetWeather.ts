import { config } from '@/common/config';
import { useGetLocation } from '@/hooks/useGetLocation';
import { IWeather } from '@/types/account';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

export const useGetWeather = () => {
  const date = dayjs().format('YYYY-MM-DD');
  const hour = dayjs().format('HH');
  const { latitude, longitude } = useGetLocation(config.weather.token);

  const [weather, setWeather] = useState<IWeather | undefined>(undefined);

  const fetchData = async () => {
    const url = `${config.weather.url}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,snowfall&start_date=${date}&end_date=${date}&timezone=auto`;
    const options = {
      method: 'GET',
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
      setWeather(result);
    });
  }, []);

  return useMemo(() => {
    if (!weather) {
      return undefined;
    }

    const updatedData = {
      ...weather.hourly,
      time: weather.hourly.time.map(item => dayjs(item).format('HH')),
    };

    const time = updatedData.time.findIndex(time => time === hour);
    const temperature = weather.hourly.temperature_2m[time];
    const rain = weather.hourly.rain[time];
    const snowfall = weather.hourly.snowfall[time];

    return {
      temperature,
      rain,
      snowfall,
    };
  }, [latitude, longitude]);
};
