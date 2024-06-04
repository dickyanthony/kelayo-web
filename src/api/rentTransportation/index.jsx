import { apiCall } from '../';

export const getDetailRentTransportationAPI2 = async (id, signal) => {
  return apiCall({
    url: `/rent-transportation/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};
export const getListRentTransportationAPI = async (params, signal) => {
  console.log('list==>');
  return apiCall({
    url: '/rent-transportation',
    method: 'post',
    data: params,
    signal,
  });
};

export const getAllRentTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/rent-transportation/get-all`,
    method: 'post',
    data: params,
    signal,
  });
};
export const getListRentTransportationByRoleAPI = async (params, signal) => {
  return apiCall({
    url: `/rent-transportation/user/${params.id}`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailRentTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/rent-transportation/${params.id}`,
    method: 'post',
    data: params,
    signal,
  });
};

export const getDetailTransportationAPI = async (id, signal) => {
  return apiCall({
    url: `/rent-transportation/transportation/${id}`,
    method: 'get',
    data: null,
    signal,
  });
};

export const updateRentTransportationAPI = async (params, signal) => {
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
    url: `/rent-transportation/${params.id}`,
    method: 'put',
    data,
    signal,
    headers: hasImage ? { 'Content-Type': 'multipart/form-data' } : undefined,
  });
};

export const deleteRentTransportationAPI = async (params, signal) => {
  return apiCall({
    url: `/rent-transportation/${params.id}`,
    method: 'delete',
    data: params,
    signal,
  });
};
