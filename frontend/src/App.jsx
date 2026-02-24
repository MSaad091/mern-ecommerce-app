import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './component/Register'
import Login from './component/Login'
import Home from './component/Home'
import Product from './component/Product'
import DetailProduct from './component/DetailProduct'
import Carts from './component/Carts'
// import OrderHistory from './component/OrderHistry'
import OrderHistry from './component/OrderHistry'
// import Product from './component/Product'
function App() {
  return (
  
  <>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register />} />
    <Route path='/products' element={<Product/>} />
    <Route path='/product/:id' element={<DetailProduct/>}  />
    <Route path='/cart' element={<Carts/>} />
    <Route path='/history' element={<OrderHistry />} />
    
  </Routes>
  </>
  )
}

export default App