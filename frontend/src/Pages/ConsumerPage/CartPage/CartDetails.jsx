// CartDetails.jsx
import React, { useEffect, useState } from "react";

export default function CartDetails({ onCartUpdate }) {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart details from backend
  useEffect(() => {
    async function fetchCartDetails() {
      // Replace this with your backend API endpoint
      const response = await fetch("https://api.example.com/cart");
      const data = await response.json();
      setCartItems(data);
    }

    fetchCartDetails();
  }, []);

  // Function to increase the quantity of an item
  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    onCartUpdate(updatedCart); // Notify parent of the updated cart
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    onCartUpdate(updatedCart); // Notify parent of the updated cart
  };

  return { cartItems, increaseQuantity, decreaseQuantity };
}
