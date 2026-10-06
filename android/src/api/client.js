import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://dokanly-server.vercel.app/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@dokanly_access_token');
      if (token) {
        // Backend specifies AUTH_HEADER_TYPES = ('JWT',)
        config.headers.Authorization = `JWT ${token}`;
      }
    } catch (e) {
      console.error('Error fetching access token from storage:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refreshing
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Avoid loop on retry or refresh requests
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url?.includes('/auth/jwt/')
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('@dokanly_refresh_token');
        if (refreshToken) {
          const res = await axios.post(`${BASE_URL}/auth/jwt/refresh/`, {
            refresh: refreshToken,
          });
          
          const newAccessToken = res.data.access;
          if (newAccessToken) {
            await AsyncStorage.setItem('@dokanly_access_token', newAccessToken);
            originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshErr) {
        // If refresh fails, clear auth state
        await AsyncStorage.multiRemove([
          '@dokanly_access_token',
          '@dokanly_refresh_token',
          '@dokanly_user',
        ]);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

