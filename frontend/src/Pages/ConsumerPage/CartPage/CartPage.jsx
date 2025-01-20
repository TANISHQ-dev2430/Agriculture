import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import CartDetails from "./CartDetails";
import "./CartPage.css";

function CartPage({ cartData = [], onCartUpdate }) {
  const [cartItems, setCartItems] = useState(cartData);

  useEffect(() => {
    const fetchCartData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "users", user.uid, "cart"));
          const items = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCartItems(items);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCartData();
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCartUpdate = (itemId, action) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity =
          action === "increase" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 0) };
      }
      return item;
    }).filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    onCartUpdate(updatedCart);
  };

  return (
    <div className="cart-container">
      <div className="cart-page">
        <h2>My Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleCartUpdate(item.id, "decrease")}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleCartUpdate(item.id, "increase")}>
                    +
                  </button>
                </div>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        )}
        <h3>Total Price: ₹{totalPrice}</h3>
        {cartItems.length > 0 && (
          <button
            onClick={() => alert("Purchase successful!")}
            className="checkout-button"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default CartPage;
