
import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext.jsx";
import CartDetails from "./CartDetails.jsx";
import "./CartPage.css";

function CartPage() {
  const { cart } = useContext(CartContext);
  const [updatedCart, setUpdatedCart] = useState(cart);

  const handleCartUpdate = (newCart) => {
    setUpdatedCart(newCart);
  };

  const totalPrice = updatedCart.reduce(
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
          <CartDetails onCartUpdate={handleCartUpdate} />
        )}
        <div className="cart-total">
          <h3>Total Price: ₹{totalPrice}</h3>
        </div>
      </div>
    </div>
  );
}

export default CartPage;