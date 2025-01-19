import React, { useState } from "react";
import SetPriceModal from "./SetPriceModal"; // Import the SetPriceModal component
import "./ProductDetails.css";

function ProductDetails({ product, onPriceSet }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const handleSetPrice = () => {
    setIsModalOpen(true); // Open modal when button is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  if (!product) {
    return (
      <div className="product-details">
        <h2>Select a Product</h2>
        <p>Click on a product to view its details.</p>
      </div>
    );
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} className="detail-image" />
      <h2>{product.name}</h2>
      <p>
        <strong>Price:</strong> {product.price}
      </p>
      <p>
        <strong>Quantity Available:</strong> {product.quantity}
      </p>
      <p>
        <strong>Sold by:</strong> {product.seller}
      </p>
      <button className="set-price-button" onClick={handleSetPrice}>
        Set Price
      </button>

      {/* Conditionally render the SetPriceModal */}
      {isModalOpen && (
        <SetPriceModal
          product={product}
          onPriceSet={onPriceSet} // Pass down the callback to update the price
          closeModal={closeModal} // Pass the close modal function
        />
      )}
    </div>
  );
}

export default ProductDetails;
