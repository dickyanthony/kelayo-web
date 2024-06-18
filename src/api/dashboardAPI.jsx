import { apiCall } from '.';

export const getDashboardAPI = async (params, signal) => {
  return apiCall({
    url: `/dashboard`,
    method: 'post',
    data: params,
    signal,
  });
};
export const getDashboarSparkdAPI = async (signal) => {
  return apiCall({
    url: `/dashboard/spark`,
    method: 'get',
    data: null,
    signal,
  });
};
