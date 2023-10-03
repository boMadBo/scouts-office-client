import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { IMessage, IMessages } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const messagesAPI = createApi({
  reducerPath: 'messagesAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Messages'],
  endpoints: build => ({
    getMessages: build.query<IMessages[], { conversationId: string | undefined }>({
      query: (arg: { conversationId: string }) => ({
        url: `/messages/${arg.conversationId}`,
      }),
      providesTags: (result, error) => [{ type: 'Messages', result, error }],
    }),
    createMessages: build.mutation<IMessage[], IMessage>({
      query: messages => ({
        url: `/messages`,
        method: 'POST',
        body: messages,
      }),
      invalidatesTags: ['Messages'],
    }),
    readMessages: build.mutation<IMessage, { _id: string }>({
      query: (arg: { isReaded: boolean; _id: string }) => ({
        url: `/messages/${arg._id}`,
        method: 'PATCH',
        body: { isReaded: true },
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});
