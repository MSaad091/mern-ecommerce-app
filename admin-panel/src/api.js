import axios from 'axios'
// import { data } from 'react-router-dom';


// const api = axios.create({
//     baseURL:"http://localhost:4000/user",
//     withCredentials:true
// });
const api = axios.create({
  baseURL:"http://localhost:4000/user",
  withCredentials:true
});

export const AdminLogin = (data) => api.post('/admin/login',data)
// export const Totaluser = () => api.get('/totaluser')
export const Totaluser = () => api.get('/totaluser');
export const Users = () => api.get('/all-user')
// export const DeletUser = (id) => api.delete('/delete-user/:id',id)
export const DeletUser = (id) =>
  api.delete(`/delete-user/${id}`);
export const createProduct = (data) => api.post('/createproduct',data)
export const DeleteProduct = (id)  =>  api.delete(`/delete/${id}`)
export const AllProducts = () => api.get('allproduct')
export const DeleteProducts = (id) => api.delete(`/delete/${id}`)
export const ProductUpdate = (id,formdata) => api.put(`/update/${id}`,formdata)
export const allOrder = () => api.get('/allorder')
export const OrderStatus = (id) => api.put(`/order/${id}`);
export const allOrdercount = () => api.get('allorder')





