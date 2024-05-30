import { baseQuery } from '@/common/api/baseQuery';
import { ICountryFlag } from '@/containers/account/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const countryAPI = createApi({
  reducerPath: 'countryAPI',
  baseQuery,
  tagTypes: ['Country'],
  endpoints: build => ({
    getFlag: build.query<ICountryFlag, { country: string }>({
      query: (arg: { country: string }) => ({
        url: `/flag/${arg.country}`,
      }),
      providesTags: (result, error) => [{ type: 'Country', result, error }],
    }),
  }),
});
