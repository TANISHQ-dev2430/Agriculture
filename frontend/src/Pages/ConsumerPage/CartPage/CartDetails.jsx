import React, { useEffect, useState } from "react";

export default function CartDetails({ onCartUpdate }) {
  // Mock cart items
  const mockData = [
    { id: 1, name: "Item 1", price: 100, quantity: 2 },
    { id: 2, name: "Item 2", price: 200, quantity: 1 },
    { id: 3, name: "Item 3", price: 50, quantity: 3 },
  ];

  const [cartItems, setCartItems] = useState(mockData); // State to store the cart items

  useEffect(() => {
    // Notify parent of the initial cart items
    onCartUpdate(cartItems);
  }, [cartItems, onCartUpdate]);

  // Function to increase the quantity of an item
  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
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

  return (
    <div>{/* CartDetails only manages internal cart state and actions */}</div>
  );
}
