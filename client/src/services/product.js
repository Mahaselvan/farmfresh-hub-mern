import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add new product (for farmers)
const addProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  const response = await axios.post(API_URL, productData, config);
  return response.data;
};

const productService = {
  getProducts,
  addProduct
};

export default productService;
