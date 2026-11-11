import axios from 'axios';

// Detect whether to use environment variable, local Django server, or deployed production server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dokanly-server.vercel.app/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT token if present in localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dokanly_access_token');
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refresh & Fallback on 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 Unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('dokanly_refresh_token');

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/jwt/refresh/`, {
            refresh: refreshToken,
          });

          if (res.data?.access) {
            localStorage.setItem('dokanly_access_token', res.data.access);
            originalRequest.headers.Authorization = `JWT ${res.data.access}`;
            return apiClient(originalRequest);
          }
        } catch (refreshErr) {
          // Token expired or invalid: purge stale session
          localStorage.removeItem('dokanly_access_token');
          localStorage.removeItem('dokanly_refresh_token');
          localStorage.removeItem('dokanly_user');
        }
      } else {
        localStorage.removeItem('dokanly_access_token');
        localStorage.removeItem('dokanly_user');
      }

      // If this was a public GET request (e.g., browsing products/categories),
      // retry without stale Authorization header so users can always see database items
      if (originalRequest.method?.toLowerCase() === 'get') {
        delete originalRequest.headers.Authorization;
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
