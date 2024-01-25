import { api } from 'shared/api/api';

const registerApi = api.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      })
    })
  })
})

export const useRegistration = registerApi.useRegistrationMutation;