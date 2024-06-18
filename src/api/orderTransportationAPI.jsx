import { apiCall } from '.';

export const getAllOrderTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/order-transportation`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getAllOrderTransportationByUserIdAPI = async (params, signal) => {
  return apiCall({
    url: `/order-transportation/${params.userId}`,
    method: 'get',
    data: params,
    signal,
  });
};

export const updateOrderTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/order-transportation/${params.id}`,
    method: 'put',
    data: params,
    signal,
  });
};
