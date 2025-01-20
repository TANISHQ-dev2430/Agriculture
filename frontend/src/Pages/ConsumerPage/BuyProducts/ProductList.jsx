import React from "react";
import "./ProductList.css";

function ProductList({ productList, onSelectProduct }) {
  return (
    <div className="product-list">
      {productList.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => onSelectProduct(product)}
        >
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Seller: {product.seller}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
