import { api } from 'shared/api/api';

const stepApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFiles: build.mutation({
      query: (body) => ({
        url: '/files',
        method: 'POST',
        body,
      }),
    }),
    downloadFiles: build.query({
      query: (key) => ({
        url: `/files/${key}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
    updateInfo: build.mutation({
      query: (body) => ({
        url: '/users/info',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['User']
    }),
    getCurrent: build.query({
      query: () => ({
        url: '/users/current',
      }),
      providesTags: ['User']
    })
  })
});

export const useUploadFiles = stepApi.useUploadFilesMutation;
export const useDownloadFiles = stepApi.useDownloadFilesQuery;
export const useUpdateUsersInfo = stepApi.useUpdateInfoMutation;
export const useCurrent = stepApi.useGetCurrentQuery;