export const API_BASE_URL = "http://localhost:5000/api";

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  EMPLOYEES: "/dashboard/employees",
};

export const EMPLOYEE_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

export const TOAST_CONFIG = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const ERROR_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Invalid email format",
  INVALID_MOBILE: "Invalid mobile number",
  MIN_PASSWORD: "Password must be at least 6 characters",
  MIN_USERNAME: "Username must be at least 3 characters",
  SERVER_ERROR: "Server error occurred",
  AUTH_FAILED: "Authentication failed",
  NETWORK_ERROR: "Network error occurred",
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "Registration successful",
  EMPLOYEE_CREATED: "Employee created successfully",
  EMPLOYEE_UPDATED: "Employee updated successfully",
  EMPLOYEE_DELETED: "Employee deleted successfully",
};
