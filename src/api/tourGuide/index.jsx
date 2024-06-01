import { apiCall } from '..';
export const getListTourGuideAPI = async (params, signal) => {
  return apiCall({
    url: '/tour-guide',
    method: 'post',
    data: params,
    signal,
  });
};

export const getAllTourGuideAPI = async (params, signal) => {
  return apiCall({
    url: `/tour-guide/get-all`,
    method: 'post',
    data: params,
    signal,
  });
};
export const getListTourGuideByRoleAPI = async (params, signal) => {
  return apiCall({
    url: `/tour-guide/user/${params.id}`,
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
