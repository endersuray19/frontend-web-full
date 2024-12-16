import React from "react";
import GlobalStyles from "styles/GlobalStyles";
import { css } from "styled-components/macro"; //eslint-disable-line

import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import ThankYouPage from "ThankYouPage.js";
import "./input.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "context/AuthProvider";
import LoginPage from "pages/Login";
import { CartProvider } from "react-use-cart";
import Cart from "pages/Cart.jsx";
import DetailProduct from "pages/DetailProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductsProvider } from "context/product_context";
import AboutUs from "pages/AboutUs";
import ContactUs from "pages/ContactUs";
import { Products } from "pages/Products";
import { FilterProvider } from "context/filter_context";
import { OrderProvider } from "context/order_context";
import RestaurantLandingPage from "pages/RestaurantLandingPage";
import Checkout from "pages/Checkout";
import Orders from "pages/Orders";
import Pricing from "pages/Pricing";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;

  return (
    <div>
      <ToastContainer />
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <ProductsProvider>
            <OrderProvider>
              <FilterProvider>
                <CartProvider>
                  <Routes>
                    <Route
                      path="/components/:type/:subtype/:name"
                      element={<ComponentRenderer />}
                    />
                    <Route
                      path="/components/:type/:name"
                      element={<ComponentRenderer />}
                    />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/" element={<RestaurantLandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                      path="/detail-product/:id"
                      element={<DetailProduct />}
                    />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/article" element={<Pricing />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                  </Routes>
                </CartProvider>
              </FilterProvider>
            </OrderProvider>
          </ProductsProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
