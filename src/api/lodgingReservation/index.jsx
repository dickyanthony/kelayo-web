import { apiCall } from '../';
export const getListLodgingReservationAPI = async (signal) => {
  return apiCall({
    url: '/lodging-reservation/get',
    method: 'get',
    data: null,
    signal,
  });
};
