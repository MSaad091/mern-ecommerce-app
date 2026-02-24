import axios from 'axios'
// import { data } from 'react-router-dom';


const api = axios.create({
    baseURL:"http://localhost:4000/user",
    withCredentials:true
});




export const Registeruser = (formdata) => api.post('/register',formdata)
export const LoginUser = (formdata) => api.post('/login',formdata)
export const GetAllProduct = () => api.get('/allproduct')
export  const AddToCart = (data) => api.post('/add',data)
export const GetProduct = (id) => api.get(`/product/${id}`)
export const  Cart = () => api.get('/cart')
export const RemoveCart = (data) => api.post('/remove',data)
export const CheckOut = () => api.post('/checkout');
export const OrderHistory = () => api.get('/history')
export const LogOutUser = () => api.post('/logout')






