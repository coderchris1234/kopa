// API service layer - Mock implementation
// This can be easily replaced with actual API calls later

const API_BASE_URL = '/api';
const MOCK_DELAY = 500; // Simulate network delay

/**
 * Simulate API delay
 */
const delay = (ms = MOCK_DELAY) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock API client
 */
class ApiClient {
  async get(endpoint) {
    await delay();
    // Return mock data based on endpoint
    return { data: null };
  }

  async post(endpoint, data) {
    await delay();
    return { data };
  }

  async put(endpoint, data) {
    await delay();
    return { data };
  }

  async delete(endpoint) {
    await delay();
    return { success: true };
  }
}

export const api = new ApiClient();

/**
 * Auth API
 */
export const authApi = {
  login: async (email, password) => {
    await delay();
    return {
      user: {
        id: '1',
        name: 'Christobel Nwachukwu',
        email,
        username: 'christobel'
      },
      token: 'mock_token'
    };
  },

  signup: async (name, email, password) => {
    await delay();
    return {
      user: {
        id: '1',
        name,
        email,
        username: name.toLowerCase().replace(/\s+/g, '')
      },
      token: 'mock_token'
    };
  },

  logout: async () => {
    await delay();
    return { success: true };
  }
};

/**
 * Creator API
 */
export const creatorApi = {
  getProfile: async (username) => {
    await delay();
    return { username, name: 'Christobel Nwachukwu' };
  },

  updateProfile: async (data) => {
    await delay();
    return data;
  }
};

/**
 * Support API
 */
export const supportApi = {
  createSupport: async (data) => {
    await delay();
    return { id: Date.now(), ...data, status: 'successful' };
  }
};

/**
 * Analytics API
 */
export const analyticsApi = {
  getOverview: async () => {
    await delay();
    return {
      earnings: 384000,
      visits: 4820,
      supportClicks: 386,
      payments: 74
    };
  },

  getTrafficSources: async () => {
    await delay();
    return [
      { source: 'Instagram', visitors: 2400, supporters: 48 },
      { source: 'TikTok', visitors: 1500, supporters: 15 },
      { source: 'WhatsApp', visitors: 600, supporters: 8 },
      { source: 'X', visitors: 320, supporters: 3 }
    ];
  }
};
