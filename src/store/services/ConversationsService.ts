import { baseQuery } from '@/api/baseQuery';
import { IConversation } from '@/containers/conversations/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const conversationsAPI = createApi({
  reducerPath: 'conversationsAPI',
  baseQuery,
  tagTypes: ['Conversations'],
  endpoints: build => ({
    createConversation: build.mutation<IConversation[], IConversation>({
      query: conversations => ({
        url: `/conversations`,
        method: 'POST',
        body: conversations,
      }),
      invalidatesTags: ['Conversations'],
    }),
    getConversations: build.query<IConversation[], void>({
      query: () => ({
        url: `/conversations`,
      }),
      providesTags: (result, error) => [{ type: 'Conversations', result, error }],
    }),
    updateConversation: build.mutation<IConversation[], { id: number }>({
      query: (args: { id: number }) => ({
        url: `/conversations/${args.id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Conversations'],
    }),
  }),
});
