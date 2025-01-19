import React, { useState } from "react";
import "./SetPriceModal.css";

function SetPriceModal({ product, onPriceSet, closeModal }) {
  const [newPrice, setNewPrice] = useState(product.price);

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value); // Set the new price from input
  };

  const handleSubmit = () => {
    if (newPrice > 0) {
      onPriceSet(newPrice); // Update the product price in parent
      closeModal(); // Close the modal after setting the price
    } else {
      alert("Please enter a valid price.");
    }
  };

  return (
    <div className="price-modal">
      <div className="modal-content">
        <h3>Set a New Price for {product.name}</h3>
        <input
          type="number"
          value={newPrice}
          onChange={handlePriceChange}
          min="0"
          placeholder="Enter new price"
        />
        <button className="submit-price-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="close-modal-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SetPriceModal;
