import axios, { AxiosError } from 'axios';

export enum FetchStatus {
  READY,
  LOADING,
  LOADED,
  ERROR
}

export enum StatusCodes {
  OK = 200,
  ERROR = 500
}

const handleError = async (error: AxiosError) => {
  if (error.response && error.response.status >= StatusCodes.OK) {
    if (process.env.NODE_ENV !== 'test') {
      // avoid show this when is running test
      console.error('Request Failed:', error.config);
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    }
  }

  return Promise.reject(error);
};

export async function GET<TResponse>(url: string, params?: { [key: string]: any }): Promise<TResponse> {
  try {
    const response = await axios.get(url, {
      baseURL: axios.defaults.baseURL,
      withCredentials: process.env.NODE_ENV !== 'test',
      headers: {
        Accept: 'application/json; charset=utf=8',
        Authorization: 'Bearer ' + axios.defaults.headers.common.Authorization
      },
      params
    });
    return response.data as Promise<TResponse>;
  } catch (error) {
    return handleError(error);
  }
}

export async function POST<TResponse>(url: string, params?: { [key: string]: any }, data?: any): Promise<TResponse> {
  try {
    const response = await axios.post(url, data, {
      baseURL: axios.defaults.baseURL,
      withCredentials: process.env.NODE_ENV !== 'test',
      headers: {
        Accept: 'application/json; charset=utf=8',
        Authorization: 'Bearer ' + axios.defaults.headers.common.Authorization
      },
      params
    });
    return response.data as Promise<TResponse>;
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT<TResponse>(url: string, params?: { [key: string]: any }, data?: any): Promise<TResponse> {
  try {
    const response = await axios.put(url, data, {
      baseURL: axios.defaults.baseURL,
      withCredentials: process.env.NODE_ENV !== 'test',
      headers: {
        Accept: 'application/json; charset=utf=8',
        Authorization: 'Bearer ' + axios.defaults.headers.common.Authorization
      },
      params
    });
    return response.data as Promise<TResponse>;
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE<TResponse>(url: string): Promise<TResponse> {
  try {
    const response = await axios.delete(url, {
      baseURL: axios.defaults.baseURL,
      withCredentials: process.env.NODE_ENV !== 'test',
      headers: {
        Accept: 'application/json; charset=utf=8',
        Authorization: 'Bearer ' + axios.defaults.headers.common.Authorization
      }
    });
    return response.data as Promise<TResponse>;
  } catch (error) {
    return handleError(error);
  }
}
