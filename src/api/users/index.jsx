import { apiCall } from '../';

export const loginAPI = async (params, signal) => {
  return apiCall({
    url: '/users/login',
    method: 'post',
    data: params,
    signal,
  });
};

export const registerAPI = async (params, signal) => {
  return apiCall({
    url: '/users/register',
    method: 'post',
    data: params,
    signal,
  });
};
