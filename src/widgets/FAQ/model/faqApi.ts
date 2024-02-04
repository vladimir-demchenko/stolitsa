import { api } from 'shared/api/api';

interface FAQResponse {
  id: string;
  question: string;
  answer: string;
}

const faqApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFAQs: build.query<FAQResponse[], null>({
      query: () => ({
        url: '/faqs',
      }),
      providesTags: ['FAQ']
    })
  })
})

export const useGetAllFAQs = faqApi.useGetAllFAQsQuery;