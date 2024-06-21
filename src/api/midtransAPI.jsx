import { apiCall } from '.';

export const getTransactionAPI = async (order_id, signal) => {
  return apiCall({
    url: `/midtrans/transaction/${order_id}`,
    method: 'get',
    data: null,
    signal,
  });
};
export const createTransactionAPI = async (params, signal) => {
  return apiCall({
    url: `/midtrans`,
    method: 'post',
    data: params,
    signal,
  });
};
