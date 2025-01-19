import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import { products } from "../data"; // Import product data
import "./BuyProducts.css";

export default function MyProducts() {
  const [productList, setProductList] = useState(products); // State to hold the list of products
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
  const [cart, setCart] = useState([]); // State to track cart contents

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

  return (
    <div className="myProducts">
      <h2>My Products</h2>
      <div className="products-content">
        <ProductList
          productList={productList}
          onSelectProduct={handleSelectProduct}
        />
        <ProductDetails product={selectedProduct} onAddToCart={handleAddToCart} />
      </div>
      <div className="cart">
        <h3>Cart</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} x {item.cartQuantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
