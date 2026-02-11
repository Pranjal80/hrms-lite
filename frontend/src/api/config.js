import axios from 'axios';

// Use environment variable for API URL, fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API
export const employeeAPI = {
  getAll: () => api.get('/api/employees'),
  getById: (id) => api.get(`/api/employees/${id}`),
  create: (data) => api.post('/api/employees', data),
  delete: (id) => api.delete(`/api/employees/${id}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: (params) => api.get('/api/attendance', { params }),
  getByEmployee: (employeeId, params) => 
    api.get(`/api/employees/${employeeId}/attendance`, { params }),
  mark: (data) => api.post('/api/attendance', data),
};

// Dashboard API
export const dashboardAPI = {
  getSummary: () => api.get('/api/dashboard'),
};

export default api;
