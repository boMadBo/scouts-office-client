import { baseUrl } from '@/api/baseUrl';
import { ITask } from '@/types/account';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const tasksAPI = createApi({
  reducerPath: 'tasksAPI',
  baseQuery: baseUrl,
  tagTypes: ['Tasks'],
  endpoints: build => ({
    getTasks: build.query<ITask[], { userId: string | undefined }>({
      query: (arg: { userId: string }) => ({
        url: `/tasks/${arg.userId}`,
      }),
      providesTags: (result, error) => [{ type: 'Tasks', result, error }],
    }),
    createTask: build.mutation<ITask[], ITask>({
      query: task => ({
        url: `/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: build.mutation<ITask, { _id: string }>({
      query: (arg: { _id: string }) => ({
        url: `/tasks/${arg._id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    completeTask: build.mutation<ITask, { completed: boolean; _id: string }>({
      query: (arg: { completed: boolean; _id: string }) => ({
        url: `/tasks/${arg._id}`,
        method: 'PATCH',
        body: { completed: !arg.completed },
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});
