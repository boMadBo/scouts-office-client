import { baseUrl } from '@/api/baseUrl';
import { IConversation } from '@/containers/conversations/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const conversationsAPI = createApi({
  reducerPath: 'conversationsAPI',
  baseQuery: baseUrl,
  tagTypes: ['Conversations'],
  endpoints: build => ({
    getConversations: build.query<IConversation[], { _id: string | undefined }>({
      query: (arg: { _id: string }) => ({
        url: `/conversations/${arg._id}`,
      }),
      providesTags: (result, error) => [{ type: 'Conversations', result, error }],
    }),
    createConversations: build.mutation<IConversation[], IConversation>({
      query: conversations => ({
        url: `/conversations`,
        method: 'POST',
        body: conversations,
      }),
      invalidatesTags: ['Conversations'],
    }),
  }),
});
