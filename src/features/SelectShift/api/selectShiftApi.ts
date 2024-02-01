import { BlockType } from 'entities/Schedule/model/types';
import { api } from 'shared/api/api';

const selectShiftApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlocks: build.query<BlockType[], null>({
      query: () => ({
        url: '/blocks',
      })
    })
  })
})

export const useGetBlocks = selectShiftApi.useGetBlocksQuery;