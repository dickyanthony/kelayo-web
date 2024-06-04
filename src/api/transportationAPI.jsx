import { apiCall } from '.';

export const getTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/transportation`,
    method: 'post',
    data: params,
    signal,
  });
};

export const deleteTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/transportation/${params.id}`,
    method: 'delete',
    data: params,
    signal,
  });
};

export const updateTransportationAPI = async (params, signal) => {
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
    url: `/transportation/${params.id}`,
    method: 'put',
    data,
    signal,
    headers: hasImage ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
};
