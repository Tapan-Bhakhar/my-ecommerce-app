import axios from 'axios';

export const BASE_URL = 'http://localhost:3005';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
