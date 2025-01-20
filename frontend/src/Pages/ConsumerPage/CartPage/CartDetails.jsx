import React, { useEffect, useState } from "react";
import "./CartDetails.css";

export default function CartDetails({ cartItems = [], onCartUpdate }) {
  const [items, setItems] = useState(cartItems); // State to store the cart items

  useEffect(() => {
    setItems(cartItems); // Update items when cartItems prop changes
  }, [cartItems]);

  // Function to increase the quantity of an item
  const increaseQuantity = (itemId) => {
    const updatedCart = items.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedCart);
    onCartUpdate(updatedCart); // Notify parent of the updated cart
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (itemId) => {
    const updatedCart = items.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setItems(updatedCart);
    onCartUpdate(updatedCart); // Notify parent of the updated cart
  };

  return (
    <div className="cart-details">
      <h2>Cart Details</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} x {item.quantity}
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
