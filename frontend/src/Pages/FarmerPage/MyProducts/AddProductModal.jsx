import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/firebase.js";
import { collection, addDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import "./AddProductModal.css";

function AddProductModal({ product, onAddProduct, closeModal }) {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [quantity, setQuantity] = useState(product ? product.quantity : "");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      }
    };

    fetchUsername();
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
            seller: username,
          };

          const docRef = await addDoc(collection(db, "products"), newProduct);
          console.log("Product added to Firestore:", newProduct);

          onAddProduct({ id: docRef.id, ...newProduct });

          setName("");
          setPrice("");
          setQuantity("");
          closeModal();
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

  const handleDelete = async () => {
    if (product && product.id) {
      try {
        await deleteDoc(doc(db, "products", product.id));
        alert("Product deleted successfully!");
        closeModal();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    } else {
      alert("No product selected to delete.");
    }
  };

  return (
    <div className="add-product-modal">
      <div className="modal-content">
        <h3>{product ? "Edit Product" : "Add New Product"}</h3>
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
          {product ? "Update Product" : "Add Product"}
        </button>
        <button className="cancel-button" onClick={closeModal}>
          Cancel
        </button>
        {product && (
          <button className="delete-button" onClick={handleDelete}>
            Delete Product
          </button>
        )}
      </div>
    </div>
  );
}

export default AddProductModal;
