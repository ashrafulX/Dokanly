import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from AsyncStorage
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@dokanly_access_token');
      const storedUser = await AsyncStorage.getItem('@dokanly_user');

      if (storedToken && storedUser) {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Verify / Refresh latest user info in background
        fetchUserProfile();
      }
    } catch (e) {
      console.error('Failed to load auth credentials:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await apiClient.get('/auth/users/me/');
      if (res.data) {
        setUser(res.data);
        await AsyncStorage.setItem('@dokanly_user', JSON.stringify(res.data));
      }
    } catch (e) {
      console.error('Failed to fetch user profile:', e);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/jwt/create/', { email, password });
      const { access, refresh } = res.data;

      await AsyncStorage.setItem('@dokanly_access_token', access);
      await AsyncStorage.setItem('@dokanly_refresh_token', refresh);
      setAccessToken(access);

      // Fetch user profile after obtaining token
      const profileRes = await apiClient.get('/auth/users/me/');
      const userData = profileRes.data;

      await AsyncStorage.setItem('@dokanly_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      return { success: false, message: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      // POST /auth/users/
      await apiClient.post('/auth/users/', userData);
      // Auto login after successful registration
      return await login(userData.email, userData.password);
    } catch (error) {
      let message = 'Registration failed.';
      if (error.response?.data) {
        const errors = error.response.data;
        const firstKey = Object.keys(errors)[0];
        if (firstKey) {
          const val = errors[firstKey];
          message = Array.isArray(val) ? `${firstKey}: ${val[0]}` : `${firstKey}: ${val}`;
        }
      }
      return { success: false, message };
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await apiClient.patch('/auth/users/me/', updatedData);
      setUser(res.data);
      await AsyncStorage.setItem('@dokanly_user', JSON.stringify(res.data));
      return { success: true, user: res.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to update profile.',
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        '@dokanly_access_token',
        '@dokanly_refresh_token',
        '@dokanly_user',
        '@dokanly_cart_id',
      ]);
      setUser(null);
      setAccessToken(null);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshUserProfile: fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

