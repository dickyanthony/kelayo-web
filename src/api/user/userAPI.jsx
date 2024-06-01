import { apiCall } from '..';

export const getAllUserAPI = async (params, signal) => {
  return apiCall({
    url: `/user/get-all`,
    method: 'post',
    data: params,
    signal,
  });
};
