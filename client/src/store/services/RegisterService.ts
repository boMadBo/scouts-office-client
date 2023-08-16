import { baseQueryWithAuth } from '@/api/baseQueryWithAuth';
import { IRegister } from '@/interfaces';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const registerAPI = createApi({
  reducerPath: 'registerAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Register'],
  endpoints: build => ({
    createReg: build.mutation<IRegister, FormData>({
      query: formData => ({
        url: `/auth/register`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Register'],
    }),
  }),
});
