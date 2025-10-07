
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Products from './components/Products'
import Cart from "./components/Cart"
import ProductDetail from './components/ProductDetail'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import Header from './components/Header'
import { AuthProvider } from './components/context/AuthContext'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ProdProvider } from './components/context/productContext'
import { CartProvider } from './components/context/cartContext'
 function  App() {

  
  return (
    <>
    <CartProvider>
    <ProdProvider>
    <AuthProvider>
    <BrowserRouter>
    
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/product/:id" element={<ProductDetail />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
    <Footer>

    </Footer>
    </BrowserRouter>
    </AuthProvider>
    </ProdProvider>
    </CartProvider>
    </>
  )
}

export default App
