import { api } from 'shared/api/api';

const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ approve_shift, shiftId, name, email, flag }) => ({
        url: '/users',
        params: { approve_shift, shiftId, name, email, flag }
      }),
      providesTags: ['User']
    }),
    getShiftsFilter: build.query({
      query: () => ({
        url: '/shifts'
      }),
      providesTags: ['Shifts']
    })
  })
})

export const useGetUsers = adminApi.useGetUsersQuery;
export const useGetShiftsFilter = adminApi.useGetShiftsFilterQuery;