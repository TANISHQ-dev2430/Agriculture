import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase.js";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import AddProductModal from "./AddProductModal";
import "./MyProducts.css";

function MyProducts() {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = (newProduct) => {
    setProductList((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProductList((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="my-products">
      <h2>My Products</h2>
      <button onClick={() => setIsModalOpen(true)}>Add New Product</button>
      <div className="product-list">
        {productList.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => handleSelectProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddProductModal
          product={selectedProduct}
          onAddProduct={handleAddProduct}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default MyProducts;