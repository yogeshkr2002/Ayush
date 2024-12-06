import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Create clearUserData function before using it
const clearUserData = () => {
  localStorage.clear();
  delete api.defaults.headers.common["Authorization"];
};

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearUserData();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    clearUserData();
  }
};

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const isAuthenticated = () => {
  return !!getAuthToken();
};

const logout = () => {
  clearUserData();
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Export all functions and the api instance
export {
  clearUserData,
  setAuthToken,
  getAuthToken,
  isAuthenticated,
  logout,
  getCurrentUser,
};

export default api;
