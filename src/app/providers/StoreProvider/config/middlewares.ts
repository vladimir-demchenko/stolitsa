import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export const unauthorizedErrorHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      // const errorCode = action.meta.baseQueryMeta.response.status;

      // if (errorCode === 401) {
      //   localStorage.clear();
      // }
    }
    return next(action);
  };
