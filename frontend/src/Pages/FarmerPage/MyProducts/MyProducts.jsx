import React, { useState, useEffect } from "react";
import { db, auth } from "../../../firebase/firebase.js"; // Import Firestore and auth
import { collection, getDocs, query, where } from "firebase/firestore";
import AddProductModal from "./AddProductModal";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import "./MyProducts.css";

export default function MyProducts() {
  const [productList, setProductList] = useState([]); // State to hold the list of products
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to manage the add product modal

  useEffect(() => {
    const fetchProducts = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const q = query(collection(db, "products"), where("farmerUid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProductList(products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
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
