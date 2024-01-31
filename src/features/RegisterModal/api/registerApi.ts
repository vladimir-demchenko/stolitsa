import { api } from 'shared/api/api';

const registerApi = api.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      })
    }),
    login: build.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        body,
      }),
    }),
    forgot: build.mutation({
      query: (body) => ({
        url: '/auth/forgotPassword',
        method: 'POST',
        body
      })
    })
  })
})

export const useRegistration = registerApi.useRegistrationMutation;
export const useLogin = registerApi.useLoginMutation;
export const useForgot = registerApi.useForgotMutation;