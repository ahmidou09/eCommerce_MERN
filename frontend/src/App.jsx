import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/ui/AppLayout";
import PrivateRoute from "./components/ui/PrivateRoute";
import Products from "./components/products/Products";
import ProductView from "./components/productView/ProductView";
import Profile from "./components/account/Profile";
import AddressBook from "./components/account/AddressBook";
import MyOrders from "./components/account/MyOrders";
import Cancellations from "./components/account/Cancellations";
import AdminRoute from "./components/ui/AdminRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import WishList from "./pages/WishList";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import MyAccount from "./pages/MyAccount";
import ProductList from "./pages/admin/ProductList";
import OrderList from "./pages/admin/OrderList";
import UserList from "./pages/admin/UserList";

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
            <Route path="contact" element={<Contact />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="wishList" element={<WishList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<PrivateRoute />}>
              <Route path="account" element={<MyAccount />}>
                <Route path="profile" element={<Profile />} />
                <Route path="address-book" element={<AddressBook />} />
                <Route path="orders" element={<MyOrders />} />
                <Route path="cancellations" element={<Cancellations />} />
                <Route path="wishList" element={<WishList />} />
              </Route>
              <Route path="checkout" element={<Checkout />} />
              <Route path="cancellations" element={<Cancellations />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="orders/:id" element={<Order />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="admin/users" element={<UserList />} />
              <Route path="admin/orders" element={<OrderList />} />
              <Route path="admin/products" element={<ProductList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
