import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const createAxiosInstance = (withToken = false) => {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (withToken) {
    instance.interceptors.request.use(
      (config) => {
        const token = JSON.parse(localStorage.getItem('token'));

        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (axios.isCancel(error)) {
        console.log('Request was', error.message);
      } else {
        throw error;
      }
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();
const axiosAuthInstance = createAxiosInstance(true);

const checkServerConnection = async () => {
  try {
    await axiosInstance.get('/');
    return true;
  } catch (error) {
    return false;
  }
};

export const apiAuthCall = async ({ url, method = 'get', data = null, params = null, signal }) => {
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

export const apiCall = async ({ url, method = 'get', data = null, params = null, signal }) => {
  try {
    const isConnected = await checkServerConnection();
    if (!isConnected) {
      throw new Error('Server is not connected');
    }

    const res = await axiosAuthInstance({
      url,
      method,
      data,
      params,
      signal,
    });

    return res.data;
  } catch (error) {
    if (signal && signal.aborted) {
      throw 'ERR_CANCELED';
    }
    if (error.response && error.response.status === 403) {
      throw '403';
    } else {
      throw error.response ? error.response.data : 'Network error';
    }
  }
};
