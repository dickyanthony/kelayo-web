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
  for (const value of params.values()) {
    console.log('params==>', value);
  }
  return apiCall({
    url: `/user/${params.id}`,
    method: 'put',
    data,
    signal,
    headers: hasImage ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
};
