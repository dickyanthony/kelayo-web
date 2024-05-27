import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (axios.isCancel(error)) {
        console.log('Request was canceled', error.message);
      } else {
        throw error;
      }
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

const checkServerConnection = async () => {
  try {
    await axiosInstance.get('/');
    return true;
  } catch (error) {
    return false;
  }
};

export const apiCall = async ({ url, method = 'get', data = null, params = null, signal }) => {
  try {
    const isConnected = await checkServerConnection();
    if (!isConnected) {
      throw new Error('Server is not connected');
    }

    const response = await axiosInstance({
      url,
      method,
      data,
      params,
      signal,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Network error';
  }
};
