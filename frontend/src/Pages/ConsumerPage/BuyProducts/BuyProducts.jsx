import React, { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import { db, auth } from "../../../firebase/firebase.js"; // Import Firestore and auth
import { collection, getDocs, addDoc } from "firebase/firestore";
import "./BuyProducts.css";

export default function BuyProducts({ onAddToCart }) {
  const [productList, setProductList] = useState([]); // State to hold the list of products
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductList(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product); // Set the selected product
  };

  const handleAddToCart = (product) => {
    onAddToCart(product); // Add product to cart
    console.log("Adding to cart:", product);
  };

  return (
    <div className="buy-products">
      <h2>Available Products</h2>
      <div className="products-content">
        <ProductList
          productList={productList} // Pass the updated product list
          onSelectProduct={handleSelectProduct} // Pass the function to handle product selection
        />
        <ProductDetails
          product={selectedProduct}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
