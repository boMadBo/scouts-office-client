import { baseQuery } from '@/api/baseUrl';
import { ICreateTask, ITask } from '@/containers/account/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const taskAPI = createApi({
  reducerPath: 'taskAPI',
  baseQuery,
  tagTypes: ['Tasks'],
  endpoints: build => ({
    createTask: build.mutation<ITask[], ICreateTask>({
      query: task => ({
        url: `/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    getTasks: build.query<ITask[], void>({
      query: () => ({
        url: `/tasks`,
      }),
      providesTags: (result, error) => [{ type: 'Tasks', result, error }],
    }),
    deleteTask: build.mutation<ITask, { id: string }>({
      query: (arg: { id: string }) => ({
        url: `/tasks/${arg.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: build.mutation<ITask, { completed: boolean; id: string }>({
      query: (arg: { completed: boolean; id: string }) => ({
        url: `/tasks/${arg.id}`,
        method: 'PATCH',
        body: { completed: !arg.completed },
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});
