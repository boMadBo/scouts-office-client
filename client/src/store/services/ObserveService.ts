import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { Observe } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const observeAPI = createApi({
  reducerPath: 'observeAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Observe'],
  endpoints: build => ({
    getObserve: build.query<Observe[], { userId: string | undefined }>({
      query: (arg: { userId: string }) => ({
        url: `/observe/${arg.userId}`,
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
    deleteObserve: build.mutation<Observe, { _id: string | undefined }>({
      query: (arg: { _id: string | undefined }) => ({
        url: `/observe/${arg._id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Observe'],
    }),
  }),
});
