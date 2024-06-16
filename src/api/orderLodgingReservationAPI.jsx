import { apiCall } from '.';

export const getAllOrderLodgingReservationAPI = async (params, signal) => {
  return apiCall({
    url: `/order-lodging-reservation`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getAllOrderLodgingReservationByUserIdAPI = async (params, signal) => {
  return apiCall({
    url: `/order-lodging-reservation/${params.userId}`,
    method: 'get',
    data: params,
    signal,
  });
};

export const updateOrderLodgingReservationAPI = async (params, signal) => {
  return apiCall({
    url: `/order-lodging-reservation/${params.id}`,
    method: 'put',
    data: params,
    signal,
  });
};
