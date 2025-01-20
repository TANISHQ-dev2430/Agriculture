import React, { useState } from "react";
import SetPriceModal from "./SetPriceModal"; // Ensure this file exists and is correctly implemented
import "./ProductDetails.css";

function ProductDetails({ product, onPriceSet }) {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false); // Track price modal visibility

  const handleSetPrice = () => {
    setIsPriceModalOpen(true); // Open price modal
  };

  const closePriceModal = () => {
    setIsPriceModalOpen(false); // Close price modal
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
      <button onClick={handleSetPrice}>Set Price</button>
      {isPriceModalOpen && (
        <SetPriceModal
          product={product}
          onClose={closePriceModal}
          onPriceSet={onPriceSet}
        />
      )}
    </div>
  );
}

export default ProductDetails;
