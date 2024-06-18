import { apiCall } from '.';

export const getDashboardAPI = async (params, signal) => {
  return apiCall({
    url: `/dashboard`,
    method: 'post',
    data: params,
    signal,
  });
};
export const getDashboardSparkAPI = async (params, signal) => {
  return apiCall({
    url: `/dashboard/spark`,
    method: 'post',
    data: params,
    signal,
  });
};
