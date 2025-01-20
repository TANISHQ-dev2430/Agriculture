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

  const handleCheckout = async () => {
    if (!selectedProduct) {
      alert("Please select a product to checkout.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to proceed with the checkout.");
      return;
    }

    const orderData = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      userId: user.uid,
      userEmail: user.email,
      orderDate: new Date().toISOString(),
    };

    try {
      await setDoc(doc(collection(db, "orders")), orderData);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      <ProductList products={productList} onSelectProduct={handleSelectProduct} />
      {selectedProduct && <ProductDetails product={selectedProduct} />}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

BuyProducts.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};
``