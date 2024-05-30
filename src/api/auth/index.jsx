import { apiCall } from '..';

export const loginAPI = async (params, signal) => {
  return apiCall({
    url: '/auth/login',
    method: 'post',
    data: params,
    signal,
  });
};

export const registerAPI = async (params, signal) => {
  return apiCall({
    url: '/auth/register',
    method: 'post',
    data: params,
    signal,
  });
};
