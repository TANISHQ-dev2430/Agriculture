import React from "react";
import { products } from "../data.js";
import "../MyProducts/ProductList.css";

function RentalItems({ onSelectProduct }) {
  return (
    <div className="product-list">
        <h3>Available Rental Items in Your Locality</h3>
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => onSelectProduct(product)} // Notify parent of selected product
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Seller: {product.seller}</p>
        </div>
      ))}
    </div>
  );
}

export default RentalItems;
