import { api } from 'shared/api/api';

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { unauthorizedErrorHandler } from './middlewares';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(unauthorizedErrorHandler)
      .concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
