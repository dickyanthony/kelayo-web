import { apiAuthCall } from '..';

export const loginAPI = async (params, signal) => {
  return apiAuthCall({
    url: '/auth/login',
    method: 'post',
    data: params,
    signal,
  });
};

export const registerAPI = async (params, signal) => {
  return apiAuthCall({
    url: '/auth/register',
    method: 'post',
    data: params,
    signal,
  });
};
