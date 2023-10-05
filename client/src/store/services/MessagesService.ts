import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { IMessage, IMessages } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const messagesAPI = createApi({
  reducerPath: 'messagesAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Messages'],
  endpoints: build => ({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    getMessages: build.query<IMessages[], { conversationId: string | undefined }>({
=======
    getMessages: build.query<IMessages[], { conversationId: string }>({
>>>>>>> a40623b (add messages logic)
=======
    getMessages: build.query<IMessages[], { conversationId: string | undefined }>({
>>>>>>> b6a0b5c (start ws)
=======
    getMessages: build.query<IMessages[], { conversationId: string | undefined }>({
>>>>>>> main
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
    }),
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a40623b (add messages logic)
=======
>>>>>>> 9b4e008 (add dialogs)
=======
>>>>>>> main
  }),
});
