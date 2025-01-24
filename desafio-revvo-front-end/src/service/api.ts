import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'source': 'web',
  },
});

api.interceptors.request.use((request) => {
  const headers = request.headers ?? {};

  headers.source = 'web'; 
  headers['Cache-Control'] = 'no-cache';

  const accessToken = sessionStorage.getItem('access_token');
  if (accessToken && request.url !== 'auth/refresh') {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  request.headers = headers;
  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      const refreshToken = sessionStorage.getItem('refresh_token');

      if (refreshToken && !isRefreshing) {
        originalRequest._retry = true; 
        isRefreshing = true;

        try {
          const refreshResponse = await api.post<{ access_token: string }>(
            'auth/refresh',
            null,
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          const newAccessToken = refreshResponse.data.access_token;
          sessionStorage.setItem('access_token', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          isRefreshing = false;

          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('refresh_token');
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
