import { apiCall } from '../';
export const getListTouristDestinationAPI = async (params, signal) => {
  return apiCall({
    url: '/tourist-destination',
    method: 'post',
    data: params,
    signal,
  });
};

export const getAllTouristDestinationAPI = async (params, signal) => {
  return apiCall({
    url: `/tourist-destination/get-all`,
    method: 'post',
    data: params,
    signal,
  });
};
export const getListTouristDestinationByRoleAPI = async (params, signal) => {
  return apiCall({
    url: `/tourist-destination/user/${params.id}`,
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
