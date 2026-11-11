import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../Services/api-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dokanly_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Fetch current user from /auth/users/me/
  const loadUser = async () => {
    const token = localStorage.getItem('dokanly_access_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.get('/auth/users/me/');
      setUser(res.data);
      localStorage.setItem('dokanly_user', JSON.stringify(res.data));
    } catch (err) {
      console.warn('Failed to recover user profile from token:', err.message);
      setUser(null);
      localStorage.removeItem('dokanly_access_token');
      localStorage.removeItem('dokanly_refresh_token');
      localStorage.removeItem('dokanly_user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login handler with Django JWT
  const login = async (email, password) => {
    try {
      const res = await apiClient.post('/auth/jwt/create/', {
        email: email.trim(),
        password: password,
      });

      if (res.data?.access) {
        localStorage.setItem('dokanly_access_token', res.data.access);
        if (res.data?.refresh) {
          localStorage.setItem('dokanly_refresh_token', res.data.refresh);
        }

        // Fetch user profile from Django database
        const profileRes = await apiClient.get('/auth/users/me/');
        setUser(profileRes.data);
        localStorage.setItem('dokanly_user', JSON.stringify(profileRes.data));
        return { success: true, user: profileRes.data };
      }
      return { success: false, error: 'Authentication failed. Please verify credentials.' };
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        'Invalid email or password. Please try again.';
      return { success: false, error: errorMsg };
    }
  };

  // Registration handler with Django Djoser
  const register = async ({ email, password, first_name = '', last_name = '', phone_number = '', address = '' }) => {
    try {
      await apiClient.post('/auth/users/', {
        email: email.trim(),
        password: password,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        phone_number: phone_number.trim(),
        address: address.trim(),
      });

      // Automatically sign in after registration
      return await login(email, password);
    } catch (err) {
      // If server returned 500 (e.g. SMTP email error on Vercel), the user was already created
      // and auto-activated in PostgreSQL: attempt login immediately
      if (err.response?.status === 500) {
        const loginAttempt = await login(email, password);
        if (loginAttempt.success) {
          return loginAttempt;
        }
      }

      let errorMsg = 'Registration failed. Please check your details.';
      if (err.response?.data) {
        const errors = err.response.data;
        if (typeof errors === 'object') {
          const keys = Object.keys(errors);
          if (keys.length > 0) {
            const firstKey = keys[0];
            const val = errors[firstKey];
            errorMsg = Array.isArray(val) ? `${firstKey}: ${val[0]}` : String(val);
          }
        }
      }
      return { success: false, error: errorMsg };
    }
  };

  // Update profile handler (/auth/users/me/)
  const updateProfile = async (data) => {
    try {
      const res = await apiClient.patch('/auth/users/me/', data);
      setUser(res.data);
      localStorage.setItem('dokanly_user', JSON.stringify(res.data));
      return { success: true, user: res.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data ? JSON.stringify(err.response.data) : 'Failed to update profile.' 
      };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('dokanly_access_token');
    localStorage.removeItem('dokanly_refresh_token');
    localStorage.removeItem('dokanly_user');
    setUser(null);
  };

  const isAdmin = user?.is_staff || user?.email === 'admin@dokanly.com' || user?.email === 'admin@example.com';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        register,
        logout,
        updateProfile,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
