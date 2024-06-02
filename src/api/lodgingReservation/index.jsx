import { apiCall } from '../';
export const getListLodgingReservationAPI = async (params, signal) => {
  return apiCall({
    url: '/lodging-reservation',
    method: 'post',
    data: params,
    signal,
  });
};

export const getAllLodgingReservationAPI = async (params, signal) => {
  return apiCall({
    url: `/lodging-reservation/get-all`,
    method: 'post',
    data: params,
    signal,
  });
};
export const getListLodgingReservationByRoleAPI = async (params, signal) => {
  return apiCall({
    url: `/lodging-reservation/user/${params.id}`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailLodgingReservationAPI = async (id, signal) => {
  return apiCall({
    url: `/lodging-reservation/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};

export const deleteLodgingReservationAPI = async (params, signal) => {
  return apiCall({
    url: `/lodging-reservation/${params.id}`,
    method: 'delete',
    data: params,
    signal,
  });
};
