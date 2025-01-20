import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import AddProductModal from "./AddProductModal"; // Import AddProductModal
import { products } from "../data"; // Import product data
import "./MyProducts.css";

export default function MyProducts() {
  const [productList, setProductList] = useState(products); // Product list state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add modal visibility state

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
    <div className="myProducts">
      <div className="header">
        <h2 className="header-title">My Products</h2>
        <button className="add-product-button" onClick={openAddModal}>
          Add Product
        </button>
      </div>
      <div className="products-content">
        <ProductList
          productList={productList}
          onSelectProduct={handleSelectProduct}
        />
        <ProductDetails
          product={selectedProduct}
          onPriceSet={handlePriceSet}
        />
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <AddProductModal
          onAddProduct={handleAddProduct}
          closeModal={closeAddModal}
        />
      )}
    </div>
  );
}
