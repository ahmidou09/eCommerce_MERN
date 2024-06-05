import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AppLayout from "./ui/AppLayout";
import Products from "./components/products/Products";
import ProductView from "./components/productView/ProductView";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import WishList from "./pages/WishList";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductView />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishList" element={<WishList />} />
            <Route path="contact" element={<Contact />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
