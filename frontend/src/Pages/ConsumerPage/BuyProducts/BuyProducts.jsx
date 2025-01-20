<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import { db, auth } from "../../../firebase/firebase.js"; // Import Firestore and auth
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import PropTypes from "prop-types";
=======
import React, { useState, useRef } from "react";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import { products } from "../data"; // Import product data
import CartModal from "./CartModal";
>>>>>>> aae320c115147432751363ce0400c0c8dade01f6
import "./BuyProducts.css";

export default function BuyProducts({ onAddToCart }) {
  const [productList, setProductList] = useState([]); // State to hold the list of products
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
  const [cart, setCart] = useState([]); // State to track cart contents
  const cartModalRef = useRef();

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

<<<<<<< HEAD
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
=======
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
>>>>>>> aae320c115147432751363ce0400c0c8dade01f6
      <div className="products-content">
        <ProductList
          productList={productList} // Pass the updated product list
          onSelectProduct={handleSelectProduct} // Pass the function to handle product selection
        />
        <ProductDetails
          product={selectedProduct}
<<<<<<< HEAD
          onCheckout={handleCheckout} // Pass the function to handle checkout
=======
          onAddToCart={handleAddToCart} // Pass the function to handle adding to cart
>>>>>>> aae320c115147432751363ce0400c0c8dade01f6
        />
      </div>
      <CartModal ref={cartModalRef} title="Your Cart" cart={cart} />
    </div>
  );
}

BuyProducts.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};
