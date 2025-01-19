import React, { useState } from "react";
import "./AddProductModal.css";

function AddProductModal({ onAddProduct, closeModal }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAdd = () => {
    if (name && price > 0 && quantity >= 0) {
      const newProduct = {
        id: Date.now(), // Use a unique ID for the new product
        name,
        price: Number(price),
        quantity: Number(quantity),
      };
      onAddProduct(newProduct);
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
