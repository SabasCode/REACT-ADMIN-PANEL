import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach JWT token to headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const loginAdmin = (formData) => API.post('/auth/login', formData);
export const registerAdmin = (formData) => API.post('/auth/register', formData);

// Product APIs
export const getProducts = () => API.get('/products');
export const createProduct = (productData) => API.post('/products', productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const getDashboardStats = () => API.get('/products/stats');

// Category APIs
export const getCategories = () => API.get('/categories');
export const createCategory = (categoryData) => API.post('/categories', categoryData);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

// User APIs
export const getUsers = () => API.get('/users');
export const deleteUser = (id) => API.delete(`/users/${id}`);