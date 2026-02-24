import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './Component/Login'
import DashBoard from './Component/DashBoard'
import PrivateRoute from './Component/PriveRoute'
import CreateProduct from './Component/CreateProduct'
import AllProduct from './Component/AllProduct'
import UpdateProduct from './Component/UpdateProduct'
import AllOrder from './Component/AllOrder'
import AllorderCount from './Component/AllorderCount'
import Chart from './Component/Chart'
function App() {
  return (
    <>
<div className='page-wrapper'>
      <Routes>
<Route path='/' element={<Login/>} />
<Route   path='/dashboard' element={
    <DashBoard/>

} />
<Route path='/update-product/:id'  element={<UpdateProduct/>}/>
<Route path='/create-product' element={<CreateProduct/>} />
<Route path='/products' element={<AllProduct/>}  />
<Route path='/order' element={<AllOrder/>} />
<Route path='/order-count' element={<AllorderCount/>} />
<Route  path='/order-chart' element={<Chart/>} />
    </Routes>
</div>
    </>
  )
}
 
export default App