import React from "react";
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
      <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} className="detail-image" />
      <h2>{product.name}</h2>
      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>
      <p>
        <strong>Quantity Available:</strong> {product.quantity}
      </p>
      <p>
        <strong>Sold by:</strong> {product.seller}
      </p>
      <button
        className="add-to-cart-button"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
