import { api } from 'shared/api/api';

const creativeApi = api.injectEndpoints({
  endpoints: (build) => ({
    creativeTask: build.mutation({
      query: (body) => ({
        url: '/users/creative_task',
        method: 'PATCH',
        body
      })
    })
  })
})

export const useCreativeTask = creativeApi.useCreativeTaskMutation;