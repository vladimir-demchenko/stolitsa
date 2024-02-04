import { api } from 'shared/api/api';
import { UserResponse } from './types';

const adminUserProfileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<UserResponse, string>({
      query: (id) => ({
        url: `/users/find/${id}`
      }),
      providesTags: ['User']
    }),
    updatePersonalInfo: build.mutation({
      query: (body) => ({
        url: `/users`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    }),
    updateDetailInfo: build.mutation({
      query: (body) => ({
        url: '/users/info',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    }),
    updateUserShift: build.mutation({
      query: (body) => ({
        url: '/users/shift',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    }),
    updateApprove: build.mutation({
      query: (body) => ({
        url: '/users/approve_shift',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    }),
    updateCreativeTask: build.mutation({
      query: (body) => ({
        url: '/users/creative_task',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    })
  })
})

export const useGetUser = adminUserProfileApi.useGetUserQuery;
export const useUpdatePersonalInfo = adminUserProfileApi.useUpdatePersonalInfoMutation;
export const useUpdateDetailInfo = adminUserProfileApi.useUpdateDetailInfoMutation;
export const useUpdateShift = adminUserProfileApi.useUpdateUserShiftMutation;
export const useUpdateApprove = adminUserProfileApi.useUpdateApproveMutation;
export const useUpdateCreativeTask = adminUserProfileApi.useUpdateCreativeTaskMutation;