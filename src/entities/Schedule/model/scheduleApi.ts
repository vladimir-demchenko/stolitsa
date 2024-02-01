import { api } from 'shared/api/api';

const scheduleApi = api.injectEndpoints({
  endpoints: (build) => ({
    userShift: build.mutation({
      query: (body) => ({
        url: '/users/shift',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    })
  })
})

export const useUserShift = scheduleApi.useUserShiftMutation;