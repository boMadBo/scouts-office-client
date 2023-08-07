import { weatherAPI } from '@/store/services/WeatherService';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const useGetWeather = (latitude: number, longitude: number) => {
  const date = dayjs().format('YYYY-MM-DD');
  const hour = dayjs().format('HH');
  let { data } = weatherAPI.useGetWeatherQuery({ date, latitude, longitude });
  return useMemo(() => {
    if (!data) {
      return undefined;
    }

    const updatedData = {
      ...data.hourly,
      time: data.hourly.time.map((item) => dayjs(item).format('HH')),
    };

    const time = updatedData.time.findIndex((time) => time === hour);
    const temperature = data.hourly.temperature_2m[time];
    const rain = data.hourly.rain[time];
    const snowfall = data.hourly.snowfall[time];

    return {
      temperature,
      rain,
      snowfall,
    };
  }, [latitude, longitude]);
};
