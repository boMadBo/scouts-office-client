import { baseUrl } from '@/api/baseUrl';
import { IMessage, IMessages } from '@/containers/conversations/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const messagesAPI = createApi({
  reducerPath: 'messagesAPI',
  baseQuery: baseUrl,
  tagTypes: ['Messages'],
  endpoints: build => ({
    getMessages: build.query<IMessages[], { conversationId: string | undefined; limit: number }>({
      query: (arg: { conversationId: string; limit: number }) => ({
        url: `/messages/${arg.conversationId}`,
        params: {
          limit: arg.limit,
        },
      }),
      providesTags: (result, error) => [{ type: 'Messages', result, error }],
    }),
    getAllMessages: build.query<IMessages[], void>({
      query: () => ({
        url: `/messages`,
      }),
      providesTags: (result, error) => [{ type: 'Messages', result, error }],
    }),
    createMessages: build.mutation<IMessage[], { message: IMessage }>({
      query: (arg: { message: IMessage }) => ({
        url: `/messages`,
        method: 'POST',
        body: { message: arg.message },
      }),
      invalidatesTags: ['Messages'],
    }),

    readMessages: build.mutation<IMessage, { _id: string }>({
      query: (arg: { isReaded: boolean; _id: string }) => ({
        url: `/messages/${arg._id}`,
        method: 'PATCH',
        body: { isReaded: true },
      }),
    }),
  }),
});
