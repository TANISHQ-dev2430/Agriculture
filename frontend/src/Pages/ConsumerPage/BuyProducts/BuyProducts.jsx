import React, { useState, useRef } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import { products } from "../data"; // Import product data
import CartModal from "./CartModal";
import "./BuyProducts.css";

export default function MyProducts() {
  const [productList, setProductList] = useState(products); // State to hold the list of products
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
  const [cart, setCart] = useState([]); // State to track cart contents
  const cartModalRef = useRef();

  const handleSelectProduct = (product) => {
    setSelectedProduct(product); // Set the selected product
  };

  const handleAddToCart = (product) => {
    // Check if product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // Increment quantity if it already exists
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        )
      );
    } else {
      // Add new product to the cart with initial cartQuantity
      setCart((prevCart) => [...prevCart, { ...product, cartQuantity: 1 }]);
    }
  };

  const openCartModal = () => {
    cartModalRef.current.open();
  };

  return (
    <div className="myProducts">
      <div className="header">
        <h2>Available Products</h2>
        <button className="cart-button" onClick={openCartModal}>Cart</button>
      </div>
      <div className="products-content">
        <ProductList
          productList={productList} // Pass the updated product list
          onSelectProduct={handleSelectProduct} // Pass the function to handle product selection
        />
        <ProductDetails
          product={selectedProduct}
          onAddToCart={handleAddToCart} // Pass the function to handle adding to cart
        />
      </div>
      <CartModal ref={cartModalRef} title="Your Cart" cart={cart} />
    </div>
  );
}
