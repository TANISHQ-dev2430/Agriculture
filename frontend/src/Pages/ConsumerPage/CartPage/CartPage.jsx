import React from "react";
import CartDetails from "./CartDetails";
import "./CartPage.css";

function CartPage({ cartData = [], onCartUpdate }) {
  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Purchase successful!");
    // Optionally, you can clear the cart or perform other actions here
  };

  return (
    <div className="cart-container">
      <div className="cart-page">
        <h2>My Cart</h2>
        {cartData.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div className="cart-items">
            {cartData.map((item) => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => onCartUpdate(item.id, 'decrease')}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onCartUpdate(item.id, 'increase')}>
                    +
                  </button>
                </div>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        )}
        <h3>Total Price: ₹{totalPrice}</h3>
        {cartData.length > 0 && (
          <button onClick={handleCheckout} className="checkout-button">
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default CartPage;
