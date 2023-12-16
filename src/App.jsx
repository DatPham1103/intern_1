import {Routes,Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './layout/webLayout'
import Home from "../src/pages/Home"
import Product from "../src/pages/Product"
import Management from "../src/pages/Management"

function App() {


  return (
    <>
    <Layout>
    <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/management' element={<Management/>}/>
    </Routes>
    </Layout>
    </>
  )
}

export default App
