import React, { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import AddProductModal from "./AddProductModal"; // Import AddProductModal
import { db } from "../../../firebase/firebase.js"; // Import Firestore
import { collection, getDocs } from "firebase/firestore";
import "./MyProducts.css";

export default function MyProducts() {
  const [productList, setProductList] = useState([]); // Product list state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add modal visibility state

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
    setSelectedProduct(product); // Set selected product
  };

  const handlePriceSet = (newPrice) => {
    // Update product price
    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, price: newPrice }
          : product
      )
    );
  };

  const handleAddProduct = (newProduct) => {
    setProductList((prevProducts) => [...prevProducts, newProduct]); // Add new product
    setIsAddModalOpen(false); // Close modal
  };

  const openAddModal = () => {
    setIsAddModalOpen(true); // Open add product modal
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false); // Close add product modal
  };

  return (
    <div className="my-products">
      <h1>My Products</h1>
      <button onClick={openAddModal} className="add-product-button">
        Add Product
      </button>
      <ProductList
        productList={productList}
        onSelectProduct={handleSelectProduct}
      />
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onPriceSet={handlePriceSet}
        />
      )}
      {isAddModalOpen && (
        <AddProductModal onAddProduct={handleAddProduct} closeModal={closeAddModal} />
      )}
    </div>
  );
}
