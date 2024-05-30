import { baseUrl } from '@/common/api/baseQuery';
import { IBtcAndUsdCurrency } from '@/containers/account/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const currencyAPI = createApi({
  reducerPath: 'currencyAPI',
  baseQuery: baseUrl,
  tagTypes: ['Currency'],
  endpoints: build => ({
    getBtcAndUsd: build.query<IBtcAndUsdCurrency, string>({
      query: (arg?: string) => ({
        url: `/currency/${arg}`,
      }),
      providesTags: (result, error) => [{ type: 'Currency', result, error }],
    }),
  }),
});
