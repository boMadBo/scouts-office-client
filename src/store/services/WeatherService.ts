import { instanceWeather } from '@/api/instanceWeather';
import { Weather } from '@/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const weatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery: fetchBaseQuery({ baseUrl: instanceWeather }),
  tagTypes: ['Weather'],
  endpoints: (build) => ({
    getWeather: build.query<Weather, { date: string; latitude: number; longitude: number }>({
      query: (arg: { date: string; latitude: number; longitude: number }) => ({
        url: `?latitude=${arg.latitude}&longitude=${arg.longitude}&hourly=temperature_2m,rain,snowfall&start_date=${arg.date}&end_date=${arg.date}`,
      }),
      providesTags: (result, error, { date, latitude, longitude }) => [{ type: 'Weather', date, latitude, longitude }],
    }),
  }),
});

export const { useGetWeatherQuery } = weatherAPI;
