import { ItemType } from 'entities/Schedule/model/types';
import { api } from 'shared/api/api';

const adminShiftsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getShifts: build.query<ItemType[], null>({
      query: () => ({
        url: '/shifts'
      }),
      providesTags: ['Shifts']
    }),
    updateShift: build.mutation({
      query: ({ id, body }) => ({
        url: `/shifts/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Shifts']
    })
  })
})

export const useGetShifts = adminShiftsApi.useGetShiftsQuery;
export const useUpdateShift = adminShiftsApi.useUpdateShiftMutation;