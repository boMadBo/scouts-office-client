import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const instance = 'http://localhost:3014/';

const getToken = (): string | undefined => Cookies.get('token');

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: instance,
  prepareHeaders: headers => {
    const token = getToken();
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  },
});
