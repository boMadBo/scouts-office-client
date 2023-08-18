import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
<<<<<<< HEAD
<<<<<<< HEAD
import { IProfileUpdate, IProfileValues, ISignInValues } from '@/interfaces';
=======
import { IProfileValues } from '@/interfaces';
>>>>>>> 8673b67 (add server and start auth)
=======
import { IProfileUpdate, IProfileValues } from '@/interfaces';
>>>>>>> 266d9e0 (add profile editor)
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: baseQueryWithAuth,
<<<<<<< HEAD
  tagTypes: ['SignIn', 'Profile'],
=======
  tagTypes: ['Profile'],
>>>>>>> 8673b67 (add server and start auth)
  endpoints: build => ({
    getProfile: build.query<IProfileValues, void>({
      query: () => ({
        url: '/profile',
      }),
      providesTags: (result, error) => [{ type: 'Profile', result, error }],
    }),
<<<<<<< HEAD
<<<<<<< HEAD
    getUsers: build.query<IProfileValues[], void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: (result, error) => [{ type: 'Profile', result, error }],
    }),
=======
>>>>>>> 266d9e0 (add profile editor)
    updateProfile: build.mutation<IProfileUpdate, { formData: FormData; _id: string }>({
      query: (arg: { formData: FormData; _id: string }) => ({
        url: `/profile/${arg._id}`,
        method: 'PATCH',
        body: arg.formData,
      }),
      invalidatesTags: ['Profile'],
    }),
<<<<<<< HEAD
    createSignIn: build.mutation<ISignInValues, ISignInValues>({
      query: user => ({
        url: `/auth/signin`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['SignIn', 'Profile'],
    }),
=======
>>>>>>> 8673b67 (add server and start auth)
=======
>>>>>>> 266d9e0 (add profile editor)
  }),
});
