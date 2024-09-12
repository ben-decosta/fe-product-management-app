import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/products';

// USER
// export const listApprovedProduct = () => axios.get('http://localhost:8080/api/product?status=approved');
export const listProduct = () => axios.get(REST_API_BASE_URL);
export const addProduct = (product) => axios.post(REST_API_BASE_URL, product);
export const getProductById = (productId) => axios.get(REST_API_BASE_URL + '/' + productId)
export const updateProduct = (productId, product) => axios.put(REST_API_BASE_URL + '/' + productId, product)
export const deleteProduct = (productId) => axios.delete(REST_API_BASE_URL + '/' + productId)

// ADMIN
export const listPendingProduct = () => axios.get(REST_API_BASE_URL + '/pending')
export const updateStatusApproved = (productId) => axios.put(REST_API_BASE_URL + '/' + productId + '/approve')
export const updateStatusRejected = (productId) => axios.put(REST_API_BASE_URL + '/' + productId + '/reject')