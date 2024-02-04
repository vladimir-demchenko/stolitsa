import { api } from 'shared/api/api';

interface FAQResponse {
  id: string;
  question: string;
  answer: string;
}

const adminFAQApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFAQs: build.query<FAQResponse[], null>({
      query: () => ({
        url: '/faqs'
      }),
      providesTags: ['FAQ']
    }),
    updateFAQ: build.mutation({
      query: ({ id, body }) => ({
        url: `/faqs/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['FAQ']
    }),
    createFAQ: build.mutation({
      query: (body) => ({
        url: '/faqs',
        method: 'POST',
        body
      }),
      invalidatesTags: ['FAQ']
    }),
    deleteFAQ: build.mutation({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['FAQ']
    })
  })
})

export const useGetFAQs = adminFAQApi.useGetFAQsQuery;
export const useUpdateFAQs = adminFAQApi.useUpdateFAQMutation;
export const useCreateFAQ = adminFAQApi.useCreateFAQMutation;
export const useDeleteFAQ = adminFAQApi.useDeleteFAQMutation;