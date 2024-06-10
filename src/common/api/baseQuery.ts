import { config } from '@/config';
import { ISignInResponseValues } from '@/containers/auth/types';
import { deleteRememberMe } from '@/store/reducers/RememberMeSlice';
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const baseUrl = fetchBaseQuery({
  baseUrl: config.api.url,
  prepareHeaders: headers => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseUrl(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      const reauthRequest: FetchArgs = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        url: `${config.api.url}auth/refresh`,
      };
      try {
        const refreshResponse = await baseUrl(reauthRequest, api, extraOptions);
        const hasData = refreshResponse.data as ISignInResponseValues;

        if (hasData && hasData.accessToken && hasData.refreshToken) {
          window.dispatchEvent(new CustomEvent('tokenRefreshed', { detail: hasData.refreshToken }));
          localStorage.setItem('token', hasData.accessToken);
          localStorage.setItem('refreshToken', hasData.refreshToken);
          result = await baseUrl(args, api, extraOptions);
        }
      } catch (error) {
        console.error('Token refresh error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        api.dispatch(deleteRememberMe());
      }
    } else {
      console.error('No refresh token found');
    }
  }
  return result;
};

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> = async (
  args,
  api,
  extraOptions
) => {
  try {
    return await baseQueryWithReauth(args, api, extraOptions);
  } catch (error) {
    throw error;
  }
};
