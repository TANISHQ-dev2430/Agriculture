import React, { useState } from "react";
import "./SetQuantityModal.css";

function SetQuantityModal({ product, onQuantitySet, closeModal }) {
  const [newQuantity, setNewQuantity] = useState(product.quantity);

  const handleQuantityChange = (e) => {
    setNewQuantity(Number(e.target.value)); // Set the new quantity from input
  };

  const handleSubmit = () => {
    if (newQuantity >= 0) {
      onQuantitySet(newQuantity); // Update the product quantity in parent
      closeModal(); // Close the modal after setting the quantity
    } else {
      alert("Please enter a valid quantity.");
    }
  };

  return (
    <div className="quantity-modal">
      <div className="modal-content">
        <h3>Set a New Quantity for {product.name}</h3>
        <input
          type="number"
          value={newQuantity}
          onChange={handleQuantityChange}
          min="0"
          placeholder="Enter new quantity"
        />
        <button className="submit-quantity-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="close-modal-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SetQuantityModal;
