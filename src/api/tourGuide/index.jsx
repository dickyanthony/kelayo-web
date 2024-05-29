import { apiCall } from '..';
export const getListTourGuideAPI = async (params, signal) => {
  return apiCall({
    url: '/tour-guide/get',
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailTourGuideAPI = async (id, signal) => {
  return apiCall({
    url: `/tour-guide/get/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};
