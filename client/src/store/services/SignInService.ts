import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { ISignInValues } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const signInAPI = createApi({
  reducerPath: 'signInAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['SignIn'],
  endpoints: build => ({
    createSignIn: build.mutation<ISignInValues, ISignInValues>({
      query: user => ({
        url: `/auth/signin`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['SignIn'],
    }),
  }),
});
