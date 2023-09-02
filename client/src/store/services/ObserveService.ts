import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { Observe } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const observeAPI = createApi({
  reducerPath: 'observeAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Observe'],
  endpoints: build => ({
    getObserve: build.query<Observe[], void>({
      query: () => ({
        url: '/observe',
      }),
      providesTags: (result, error) => [{ type: 'Observe', result, error }],
    }),
    createObserve: build.mutation<Observe[], Observe>({
      query: observe => ({
        url: `/observe`,
        method: 'POST',
        body: observe,
      }),
      invalidatesTags: ['Observe'],
    }),
<<<<<<< HEAD
<<<<<<< HEAD
    deleteObserve: build.mutation<Observe, { _id: string | undefined }>({
      query: (arg: { _id: string | undefined }) => ({
=======
    deleteObserve: build.mutation<Observe, { _id: string }>({
      query: (arg: { _id: string }) => ({
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
    deleteObserve: build.mutation<Observe, { _id: string | undefined }>({
      query: (arg: { _id: string | undefined }) => ({
>>>>>>> 7e204e8 (toggle observe)
        url: `/observe/${arg._id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Observe'],
    }),
  }),
});
