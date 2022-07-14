import React from "react";
import Header from "./components/Header.jsx";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import UserScreen from "./screens/UserScreen.js";
import UserEditScreen from "./screens/UserEditScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import OrderListScreen from "./screens/OrderListScreen.js";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} exact />
        <Route path="/page/:pageNumber" element={<HomeScreen />} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
          exact
        />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/" element={<CartScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeOrder" element={<PlaceOrderScreen />} />
        <Route path="/orders/:id" element={<OrderScreen />} />
        <Route path="/admin/userlist" element={<UserScreen />} />
        <Route
          path="/admin/productlist"
          exact
          element={<ProductListScreen />}
        />
        <Route
          path="/admin/productlist/:pageNumber"
          exact
          element={<ProductListScreen />}
        />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
      </Routes>
    </>
  );
};

export default App;
