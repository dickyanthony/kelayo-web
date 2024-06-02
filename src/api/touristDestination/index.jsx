import { apiCall } from '../';
export const getListTouristDestinationAPI = async (params, signal) => {
  return apiCall({
    url: '/tourist-destination',
    method: 'post',
    data: params,
    signal,
  });
};

export const getAllTouristDestinationAPI = async (params, signal) => {
  return apiCall({
    url: `/tourist-destination/get-all`,
    method: 'post',
    data: params,
    signal,
  });
};
export const getListTouristDestinationByRoleAPI = async (params, signal) => {
  return apiCall({
    url: `/tourist-destination/user/${params.id}`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailTouristDestinationAPI = async (id, signal) => {
  return apiCall({
    url: `/tourist-destination/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};

export const updateTouristDestinationAPI = async (params, signal) => {
  const hasImages = ['image1', 'image2', 'image3'].some((key) => params[key] instanceof File);

  let data;
  if (hasImages) {
    data = new FormData();
    Object.keys(params).forEach((key) => {
      data.append(key, params[key]);
    });
  } else {
    data = params;
  }

  return apiCall({
    url: `/tourist-destination/${params.id}`,
    method: 'put',
    data,
    signal,
    headers: hasImages ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
};

export const deleteTouristDestinationAPI = async (params, signal) => {
  return apiCall({
    url: `/tourist-destination/${params.id}`,
    method: 'delete',
    data: params,
    signal,
  });
};
