import { baseQuery } from '@/common/api/baseQuery';
import { IWeatherResult } from '@/containers/account/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const weatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery,
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
