import { apiCall } from '../';
export const getListTouristDestinationAPI = async (params, signal) => {
  return apiCall({
    url: '/tourist-destination',
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailTouristDestinationAPI = async (id, signal) => {
  return apiCall({
    url: `/tourist-destination/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};
