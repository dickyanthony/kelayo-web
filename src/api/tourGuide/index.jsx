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

export const updateTourGuideAPI = async (params, signal) => {
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
    url: `/tour-guide/${params.id}`,
    method: 'put',
    data,
    signal,
    headers: hasImage ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
};

export const deleteTourGuideAPI = async (params, signal) => {
  return apiCall({
    url: `/tour-guide/${params.id}`,
    method: 'delete',
    data: params,
    signal,
  });
};
