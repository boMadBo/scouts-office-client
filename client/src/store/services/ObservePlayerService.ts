import { baseUrl } from '@/api/baseUrl';
import { IPlayerIdValuesObserve } from '@/types/player';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const observePlayerAPI = createApi({
  reducerPath: 'observePlayerAPI',
  baseQuery: baseUrl,
  tagTypes: ['IPlayerIdValuesObserve'],
  endpoints: build => ({
    getPlayerObserve: build.query<IPlayerIdValuesObserve[], { userId: string | undefined }>({
      query: (arg: { userId: string }) => ({
        url: `/observe/${arg.userId}`,
      }),
      providesTags: (result, error) => [{ type: 'IPlayerIdValuesObserve', result, error }],
    }),
    createPlayerObserve: build.mutation<IPlayerIdValuesObserve[], IPlayerIdValuesObserve>({
      query: observe => ({
        url: `/observe`,
        method: 'POST',
        body: observe,
      }),
      invalidatesTags: ['IPlayerIdValuesObserve'],
    }),
    deletePlayerObserve: build.mutation<IPlayerIdValuesObserve, { _id: string | undefined }>({
      query: (arg: { _id: string | undefined }) => ({
        url: `/observe/${arg._id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['IPlayerIdValuesObserve'],
    }),
  }),
});
