import { baseQuery } from '@/common/api/baseQuery';
import { IRegistrationValues } from '@/containers/auth/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const registrationAPI = createApi({
  reducerPath: 'registrationAPI',
  baseQuery,
  tagTypes: ['Registration'],
  endpoints: build => ({
    userRegistration: build.mutation<IRegistrationValues, FormData>({
      query: formData => ({
        url: `user/registration`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Registration'],
    }),
  }),
});
