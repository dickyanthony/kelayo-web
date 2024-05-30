import { apiCall } from '..';
export const getListTourGuideAPI = async (params, signal) => {
  return apiCall({
    url: '/tour-guide',
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailTourGuideAPI = async (id, signal) => {
  return apiCall({
    url: `/tour-guide/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};
