import { apiCall } from '../';
export const getListRentTransportationAPI = async (params, signal) => {
  return apiCall({
    url: '/rent-transportation',
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailRentTransportationAPI = async (id, signal) => {
  return apiCall({
    url: `/rent-transportation/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};
