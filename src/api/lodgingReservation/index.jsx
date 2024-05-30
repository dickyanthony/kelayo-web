import { apiCall } from '../';
export const getListLodgingReservationAPI = async (params, signal) => {
  return apiCall({
    url: '/lodging-reservation',
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
