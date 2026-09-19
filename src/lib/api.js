import axios from 'axios';

// Base API configuration
export const API_BASE_URL = 'https://kopa-39h4.onrender.com';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('loginToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('loginToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  // Create account
  createAccount: async (data) => {
    const response = await api.post('/create', data);
    return response.data;
  },

  // Verify account
  verifyAccount: async (data) => {
    const response = await api.post('/verify', data);
    // Store token and user data
    if (response.data.success && response.data.data.loginToken) {
      localStorage.setItem('loginToken', response.data.data.loginToken);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Onboarding
  completeOnboarding: async (data) => {
    const response = await api.patch('/onboarding', data);
    return response.data;
  },

  // Get dashboard data
  getDashboard: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },

  // Generate donation links
  generateLink: async () => {
    const response = await api.post('/generateLink');
    return response.data;
  },
};
