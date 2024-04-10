import { baseUrl } from '@/api/baseUrl';
import { IProfileUpdateValues, IProfileValues, IUpdateUtcZone } from '@/containers/account/types';
import { ISignInResponseValues, ISignInValues } from '@/containers/auth/types';
import { IPlayer, IPlayerValuesObservation } from '@/containers/player/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

TODO: 'logout';
export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: baseUrl,
  tagTypes: ['Profile'],
  endpoints: build => ({
    signIn: build.mutation<ISignInResponseValues, ISignInValues>({
      query: user => ({
        url: `/auth/login`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Profile'],
    }),
    getProfile: build.query<IProfileValues, void>({
      query: () => ({
        url: '/user',
      }),
      providesTags: (result, error) => [{ type: 'Profile', result, error }],
    }),
    getUsers: build.query<IProfileValues[], void>({
      query: () => ({
        url: '/user/list',
      }),
      providesTags: (result, error) => [{ type: 'Profile', result, error }],
    }),
    updateProfile: build.mutation<IProfileUpdateValues, { formData: FormData }>({
      query: (arg: { formData: FormData }) => ({
        url: `/user`,
        method: 'PATCH',
        body: arg.formData,
      }),
      invalidatesTags: ['Profile'],
    }),
    createPlayerObservation: build.mutation<IPlayerValuesObservation[], IPlayerValuesObservation>({
      query: observe => ({
        url: `/user/observation`,
        method: 'POST',
        body: observe,
      }),
      invalidatesTags: ['Profile'],
    }),
    getObservablePlayers: build.query<IPlayer[], void>({
      query: () => ({
        url: '/user/observation',
      }),
      providesTags: (result, error) => [{ type: 'Profile', result, error }],
    }),
    deletePlayerObservation: build.mutation<IPlayerValuesObservation, IPlayerValuesObservation>({
      query: observe => ({
        url: `/user/observation`,
        method: 'DELETE',
        body: observe,
      }),
      invalidatesTags: ['Profile'],
    }),
    signOut: build.mutation<void, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    updateTimezone: build.mutation<IProfileValues, IUpdateUtcZone[]>({
      query: timezone => ({
        url: `/user/timezones`,
        method: 'PUT',
        body: timezone,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});
