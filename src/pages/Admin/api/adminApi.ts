import { api } from 'shared/api/api';

const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: '/users'
      }),
      providesTags: ['User']
    })
  })
})

export const useGetUsers = adminApi.useGetUsersQuery;