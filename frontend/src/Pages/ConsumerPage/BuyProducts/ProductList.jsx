import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import "./ProductList.css";

function ProductList({ productList, onSelectProduct }) {
  const [productsWithSellers, setProductsWithSellers] = useState([]);

  useEffect(() => {
    const fetchSellerNames = async () => {
      const updatedProducts = await Promise.all(
        productList.map(async (product) => {
          if (product.farmerUid) {
            const userDoc = await getDoc(doc(db, "users", product.farmerUid));
            if (userDoc.exists()) {
              return { ...product, seller: userDoc.data().username };
            }
          }
          return product;
        })
      );
      setProductsWithSellers(updatedProducts);
    };

    fetchSellerNames();
  }, [productList]);

  return (
    <div className="product-list">
      {productsWithSellers.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => onSelectProduct(product)}
        >
          <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} className="product-image" />
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Seller: {product.seller}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
