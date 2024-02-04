import { Mutex } from 'async-mutex';

import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { VITE_BASE_URL } from './const';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token') || '';
    if (token) {
      headers.set('Authorization', `Bearer ${JSON.parse(token).accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const token = localStorage.getItem('token') || '';
  if (result.error && result.error.status === 401 && token) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh-token',
            method: 'POST',
            body: { refreshToken: JSON?.parse(token)?.refreshToken || '' },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          localStorage.setItem('token', JSON.stringify(refreshResult.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.clear();
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Shifts',
    'FAQ'
  ],
  endpoints: (builder) => ({}),
});
