import { baseUrl } from '@/api/baseUrl';
import { IRegisterValues } from '@/containers/auth/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const registerAPI = createApi({
  reducerPath: 'registerAPI',
  baseQuery: baseUrl,
  tagTypes: ['Register'],
  endpoints: build => ({
    createReg: build.mutation<IRegisterValues, FormData>({
      query: formData => ({
        url: `/auth/register`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Register'],
    }),
  }),
});
