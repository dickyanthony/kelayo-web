import { apiCall } from '.';

export const getAllOrderTourGuideAPI = async (params, signal) => {
  return apiCall({
    url: `/order-tour-guide`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getListOrderTourGuideByUserIdAPI = async (params, signal) => {
  return apiCall({
    url: `/order-tour-guide/${params.userId}`,
    method: 'get',
    data: params,
    signal,
  });
};

export const updateOrderTourGuideAPI = async (params, signal) => {
  return apiCall({
    url: `/order-tour-guide/${params.id}`,
    method: 'put',
    data: params,
    signal,
  });
};
