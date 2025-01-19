import React, { useState } from "react";
import SetPriceModal from "./SetPriceModal"; // Ensure this file exists and is correctly implemented
import SetQuantityModal from "./SetQuantityModal"; // Ensure this file exists and is correctly implemented
import "./ProductDetails.css";

function ProductDetails({ product, onPriceSet, onQuantitySet }) {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false); // Track price modal visibility
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false); // Track quantity modal visibility

  const handleSetPrice = () => {
    setIsPriceModalOpen(true); // Open price modal
  };

  const handleSetQuantity = () => {
    setIsQuantityModalOpen(true); // Open quantity modal
  };

  const closePriceModal = () => {
    setIsPriceModalOpen(false); // Close price modal
  };

  const closeQuantityModal = () => {
    setIsQuantityModalOpen(false); // Close quantity modal
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
      <button className="set-quantity-button" onClick={handleSetQuantity}>
        Set Quantity
      </button>

      {/* Conditionally render the SetPriceModal */}
      {isPriceModalOpen && (
        <SetPriceModal
          product={product}
          onPriceSet={onPriceSet} // Pass the callback to update the price
          closeModal={closePriceModal} // Pass the close modal function
        />
      )}

      {/* Conditionally render the SetQuantityModal */}
      {isQuantityModalOpen && (
        <SetQuantityModal
          product={product}
          onQuantitySet={onQuantitySet} // Pass the callback to update the quantity
          closeModal={closeQuantityModal} // Pass the close modal function
        />
      )}
    </div>
  );
}

export default ProductDetails;
