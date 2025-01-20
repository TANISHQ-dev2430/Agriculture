import React, { useContext } from "react";
import { CartContext } from "./CartContext.jsx";
import "./ProductDetails.css";

function ProductDetails({ product }) {
  const { addItemToCart } = useContext(CartContext);

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
        <strong>Sold by:</strong> {product.seller}
      </p>
      <button
        className="set-price-button"
        onClick={() => addItemToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;