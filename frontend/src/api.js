import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const getColleges = (params) => API.get('/colleges', { params });
export const getCollege = (id) => API.get(`/colleges/${id}`);
export const getStates = () => API.get('/colleges/states');
export const compareColleges = (ids) => API.get('/colleges/compare', { params: { ids: ids.join(',') } });
export const predictColleges = (exam, rank) => API.get('/colleges/predict', { params: { exam, rank } });
