import { baseUrl } from '@/api/baseUrl';
import { IProfileUpdateValues, IProfileValues } from '@/types/account';
import { ISignInValues } from '@/containers/auth/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: baseUrl,
  tagTypes: ['SignIn', 'Profile'],
  endpoints: build => ({
    getProfile: build.query<IProfileValues, void>({
      query: () => ({
        url: '/profile',
      }),
      providesTags: (result, error) => [{ type: 'Profile', result, error }],
    }),
    getUsers: build.query<IProfileValues[], void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: (result, error) => [{ type: 'Profile', result, error }],
    }),
    updateProfile: build.mutation<IProfileUpdateValues, { formData: FormData; _id: string }>({
      query: (arg: { formData: FormData; _id: string }) => ({
        url: `/profile/${arg._id}`,
        method: 'PATCH',
        body: arg.formData,
      }),
      invalidatesTags: ['Profile'],
    }),
    createSignIn: build.mutation<ISignInValues, ISignInValues>({
      query: user => ({
        url: `/auth/signin`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['SignIn', 'Profile'],
    }),
  }),
});
