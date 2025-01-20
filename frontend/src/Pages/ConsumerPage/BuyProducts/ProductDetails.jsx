import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import "./ProductDetails.css";

function ProductDetails({ product, onAddToCart }) {
  const [sellerName, setSellerName] = useState("");

  useEffect(() => {
    const fetchSellerName = async () => {
      if (product && product.farmerUid) {
        const userDoc = await getDoc(doc(db, "users", product.farmerUid));
        if (userDoc.exists()) {
          setSellerName(userDoc.data().username);
        }
      }
    };

    fetchSellerName();
  }, [product]);

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
        <strong>Sold by:</strong> {sellerName}
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
