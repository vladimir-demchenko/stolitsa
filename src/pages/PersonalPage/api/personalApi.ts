import { api } from 'shared/api/api';

const personalApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrent: build.query({
      query: () => ({
        url: '/users/current',
      }),
      providesTags: ['User']
    }),
  })
})

export const useCurrent = personalApi.useGetCurrentQuery;