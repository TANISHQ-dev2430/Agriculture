import React, { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { CartContext } from './CartContext';
import './CartModal.css';

const CartModal = forwardRef(function Modal({ title }, ref) {
  const dialog = useRef();
  const { items, updateItemQuantity } = useContext(CartContext);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    },
  }));

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Proceed to checkout");
    dialog.current.close();
  };

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} x {item.quantity}
            <div className="quantity-controls">
              <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.id, 1)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <form method="dialog" id="modal-actions">
        <button type="button" onClick={() => dialog.current.close()}>Close</button>
        <button type="button" onClick={handleCheckout}>Checkout</button>
      </form>
    </dialog>,
    document.getElementById('modal-root') // Ensure this matches the id in index.html
  );
});

export default CartModal;