import { baseUrl } from '@/api/baseUrl';
import { IWeatherResult } from '@/containers/account/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const weatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery: baseUrl,
  tagTypes: ['Weather'],
  endpoints: build => ({
    getWeather: build.query<IWeatherResult, void>({
      query: () => ({
        url: `/weather`,
      }),
      providesTags: (result, error) => [{ type: 'Weather', result, error }],
    }),
  }),
});
