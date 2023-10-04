import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { ITasks } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const tasksAPI = createApi({
  reducerPath: 'tasksAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Tasks'],
  endpoints: build => ({
    getTasks: build.query<ITasks[], { userId: string | undefined }>({
      query: (arg: { userId: string }) => ({
        url: `/tasks/${arg.userId}`,
      }),
      providesTags: (result, error) => [{ type: 'Tasks', result, error }],
    }),
    createTasks: build.mutation<ITasks[], ITasks>({
      query: task => ({
        url: `/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTasks: build.mutation<ITasks, { _id: string }>({
      query: (arg: { _id: string }) => ({
        url: `/tasks/${arg._id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    completedTasks: build.mutation<ITasks, { completed: boolean; _id: string }>({
      query: (arg: { completed: boolean; _id: string }) => ({
        url: `/tasks/${arg._id}`,
        method: 'PATCH',
        body: { completed: !arg.completed },
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});
