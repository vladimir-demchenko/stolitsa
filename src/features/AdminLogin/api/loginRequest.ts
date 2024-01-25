import { api } from 'shared/api/api';

const loginRequest = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const useLogin = loginRequest.useLoginMutation;
