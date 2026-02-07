import axios from 'axios';

const API_URL = 'http://localhost:5001/api/products';

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Get all products
const getProducts = async () => {
  const response = await api.get('/');
  return response.data;
};

// Get single product
const getProduct = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Create product
const createProduct = async (productData) => {
  const response = await api.post('/', productData);
  return response.data;
};

// Update product
const updateProduct = async (id, productData) => {
  const response = await api.put(`/${id}`, productData);
  return response.data;
};

// Delete product
const deleteProduct = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

// Get farmer's products
const getMyProducts = async () => {
  const response = await api.get('/farmer/my-products');
  return response.data;
};

const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
};

export default productService;