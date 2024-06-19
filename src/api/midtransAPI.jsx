import { apiCall } from '.';

export const createTransactionAPI = async (params, signal) => {
  return apiCall({
    url: `/midtrans`,
    method: 'post',
    data: params,
    signal,
  });
};
