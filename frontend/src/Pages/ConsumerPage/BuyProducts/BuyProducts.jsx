import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import { products } from "../data"; // Import product data
import "./BuyProducts.css";

export default function MyProducts() {
  const [productList, setProductList] = useState(products); // State to hold the list of products
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product

  const handleSelectProduct = (product) => {
    setSelectedProduct(product); // Set the selected product
  };

  return (
    <div className="myProducts">
      <h2>My Products</h2>
      <div className="products-content">
        <ProductList
          productList={productList} // Pass the updated product list
          onSelectProduct={handleSelectProduct} // Pass the function to handle product selection
        />
        <ProductDetails
          product={selectedProduct}
        />
      </div>
    </div>
  );
}
