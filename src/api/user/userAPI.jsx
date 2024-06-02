import { apiCall } from '..';

export const getDetailUserAPI = async (id, signal) => {
  return apiCall({
    url: `/user/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};

export const getAllUserAPI = async (params, signal) => {
  return apiCall({
    url: `/user/get-all`,
    method: 'post',
    data: params,
    signal,
  });
};

export const updatePasswordAPI = async (params, signal) => {
  return apiCall({
    url: `/user/update-password/${params.id}`,
    method: 'put',
    data: params,
    signal,
  });
};

export const updateUserProfileAPI = async (params, signal) => {
  const hasImage = params.image instanceof File;

  let data;
  if (hasImage) {
    data = new FormData();
    Object.keys(params).forEach((key) => {
      data.append(key, params[key]);
    });
  } else {
    data = params;
  }

  return apiCall({
    url: `/user/${params.id}`,
    method: 'put',
    data,
    signal,
    headers: hasImage ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
};

export const deleteUserAPI = async (params, signal) => {
  return apiCall({
    url: `/user/${params.id}`,
    method: 'delete',
    data: params,
    signal,
  });
};
