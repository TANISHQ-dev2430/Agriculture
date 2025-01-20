import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import "./Productdata.css";

function Productdata() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const newProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Farmer UID: {product.farmerUid}</p>
          <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
        </div>
      ))}
    </div>
  );
}

export default Productdata;