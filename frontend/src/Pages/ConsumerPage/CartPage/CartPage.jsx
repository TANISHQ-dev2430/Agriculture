import React, { useState } from "react";
import CartDetails from "./CartDetails";
import "./CartPage.css";

function CartPage() {
  const [cartData, setCartData] = useState([]); // State to hold cart data

  const handleCartUpdate = (updatedCart) => {
    setCartData(updatedCart); // Update cart data when changes happen
  };

  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <div className="cart-page">
        <h2>My Cart</h2>
        {updatedCart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div className="cart-items">
            {cartData.map((item) => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => item.decreaseQuantity(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => item.increaseQuantity(item.id)}>
                    +
                  </button>
                </div>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        )}
        <div className="cart-total">
          <h3>Total Price: ₹{totalPrice}</h3>
        </div>
      </div>

      {/* Pass handleCartUpdate prop to CartDetails */}
      <CartDetails onCartUpdate={handleCartUpdate} />
    </div>
  );
}

export default CartPage;