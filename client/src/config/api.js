// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:9090';

export const API = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    LOGIN: `${API_BASE_URL}/api/user/login`,
    SIGNUP: `${API_BASE_URL}/api/user/`,
    NOTES_BASE: `${API_BASE_URL}/api/notes`,
  }
};

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return fetch(endpoint, config);
};

export default API;
