import React, { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import { db, auth } from "../../../firebase/firebase.js"; // Import Firestore and auth
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import PropTypes from "prop-types";
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

  const handleCheckout = async (product) => {
    onAddToCart(product); // Add product to cart

    const user = auth.currentUser;
    if (user) {
      try {
        const userCartRef = doc(db, "users", user.uid, "cart", product.id);
        await setDoc(userCartRef, { ...product, quantity: 1 }, { merge: true });
        alert("Purchase successful!");
      } catch (error) {
        console.error("Error adding product to user's cart:", error);
      }
    } else {
      console.error("User not authenticated. Please log in.");
    }
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
          onCheckout={handleCheckout} // Pass the function to handle checkout
        />
      </div>
    </div>
  );
}

BuyProducts.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};
