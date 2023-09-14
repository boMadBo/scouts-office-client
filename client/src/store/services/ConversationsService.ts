import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { IConversations } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const conversationsAPI = createApi({
  reducerPath: 'conversationsAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Conversations'],
  endpoints: build => ({
    getConversations: build.query<IConversations[], { _id: string | undefined }>({
      query: (arg: { _id: string }) => ({
        url: `/conversations/${arg._id}`,
      }),
      providesTags: (result, error) => [{ type: 'Conversations', result, error }],
    }),
    createConversations: build.mutation<IConversations[], IConversations>({
      query: conversations => ({
        url: `/conversations`,
        method: 'POST',
        body: conversations,
      }),
      invalidatesTags: ['Conversations'],
    }),
  }),
});
