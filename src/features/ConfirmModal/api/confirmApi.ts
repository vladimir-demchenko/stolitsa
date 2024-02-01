import { api } from 'shared/api/api';

const confirmApi = api.injectEndpoints({
  endpoints: (build) => ({
    confirmShift: build.mutation({
      query: (body) => ({
        url: '/users/approve_shift',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    })
  })
})

export const useConfirmShift = confirmApi.useConfirmShiftMutation;