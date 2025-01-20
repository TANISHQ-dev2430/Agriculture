import React from "react";
import { NavLink } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ product, onAddToCart }) {
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
      <h2>{product.name}</h2>
      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>
      <p>
        <strong>Quantity Available:</strong> {product.quantity}
      </p>
      <p>
        <strong>Sold by:</strong> {sellerName}
      </p>
      <button
        className="set-price-button"
        onClick={() => onAddToCart(product)}

      >
        Checkout
      </button>
    </div>
  );
}

export default ProductDetails;