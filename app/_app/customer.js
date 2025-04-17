import axios from "axios";
import { authApi } from "./index";

// add customer
export const addCustomer = (data) => authApi.post('/customer/add', data);

// update customer
export const updateCustomer = (data) => authApi.put('/customer/update', data);

// delete customer by id
export const deleteCustomerById = (id) => authApi.delete('/customer/delete/' + id);

// get all customer by page
export const getAllCustomerByPage = (page) => authApi.get('/customer/getAll?page=' + page)

