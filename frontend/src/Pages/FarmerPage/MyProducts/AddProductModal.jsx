import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/firebase.js";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import "./AddProductModal.css";

function AddProductModal({ onAddProduct, closeModal }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [seller, setSeller] = useState("");

  useEffect(() => {
    const fetchSeller = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setSeller(userDoc.data().username);
        }
      }
    };

    fetchSeller();
  }, []);

  const handleAdd = async () => {
    if (name && price && quantity) {
      const user = auth.currentUser;
      if (user) {
        try {
          const newProduct = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            farmerUid: user.uid,
            seller,
          };

          // Add product to Firestore
          const docRef = await addDoc(collection(db, "products"), newProduct);
          console.log("Product added to Firestore:", newProduct);

          // Call the onAddProduct callback with the new product
          onAddProduct({ id: docRef.id, ...newProduct });

          // Clear the input fields
          setName("");
          setPrice("");
          setQuantity("");
          closeModal(); // Close the modal after adding the product
        } catch (error) {
          console.error("Error adding product:", error);
          alert("Error adding product. Please try again.");
        }
      } else {
        alert("User not authenticated. Please log in.");
      }
    } else {
      alert("Please enter valid product details.");
    }
  };

  return (
    <div className="add-product-modal">
      <div className="modal-content">
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className="add-button" onClick={handleAdd}>
          Add Product
        </button>
        <button className="cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddProductModal;
