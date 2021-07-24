// auth/auth-service.js

import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true
});
export default service;
