import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { IProfileValues } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Profile'],
  endpoints: build => ({
    getProfile: build.query<IProfileValues, void>({
      query: () => ({
        url: '/profile',
      }),
      providesTags: (result, error) => [{ type: 'Profile', result, error }],
    }),
  }),
});
