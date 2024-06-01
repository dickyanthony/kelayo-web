import { apiCall } from '../';
export const getListRentTransportationAPI = async (params, signal) => {
  return apiCall({
    url: '/rent-transportation',
    method: 'post',
    data: params,
    signal,
  });
};

export const getAllRentTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/rent-transportation/get-all`,
    method: 'post',
    data: params,
    signal,
  });
};
export const getListRentTransportationByRoleAPI = async (params, signal) => {
  return apiCall({
    url: `/rent-transportation/user/${params.id}`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailRentTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/rent-transportation/${params.id}`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailTransportationAPI = async (id, signal) => {
  return apiCall({
    url: `/rent-transportation/transportation/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};
