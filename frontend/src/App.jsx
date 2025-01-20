import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/HomePage/Home.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage.jsx';
import ConsumerPage from './Pages/ConsumerPage/ConsumerPage.jsx';
import FarmerPage from './Pages/FarmerPage/FarmerPage.jsx';
import BuyProducts from "./Pages/ConsumerPage/BuyProducts/BuyProducts";
import CartPage from "./Pages/ConsumerPage/CartPage/CartPage";

function App() {
  const [cart, setCart] = useState([]); // State to hold the items in the cart

  const handleCartUpdate = (itemId, action) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : item.quantity,
            }
          : item
      )
    );
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/consumer" element={<ConsumerPage />} />
        <Route path="/farmer" element={<FarmerPage />} />
      </Routes>
      <div className="app">
        <BuyProducts onAddToCart={handleAddToCart} />
        <CartPage cartData={cart} onCartUpdate={handleCartUpdate} />
      </div>
    </Router>
  );
}

export default App;
