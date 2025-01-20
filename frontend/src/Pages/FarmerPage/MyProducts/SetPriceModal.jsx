import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase.js";
import "./SetPriceModal.css";

function SetPriceModal({ product, onClose, onPriceSet }) {
  const [newPrice, setNewPrice] = useState("");

  const handleUpdatePrice = async () => {
    if (newPrice) {
      const user = auth.currentUser;
      if (user) {
        try {
          const productRef = doc(db, "products", product.id);
          await updateDoc(productRef, { price: parseFloat(newPrice) });
          onPriceSet(parseFloat(newPrice));
          onClose();
        } catch (error) {
          console.error("Error updating price:", error);
          alert("Error updating price. Please try again.");
        }
      } else {
        alert("User not authenticated. Please log in.");
      }
    } else {
      alert("Please enter a valid price.");
    }
  };

  return (
    <div className="set-price-modal">
      <div className="modal-content">
        <h3>Set New Price for {product.name}</h3>
        <input
          type="number"
          placeholder="New Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button className="update-button" onClick={handleUpdatePrice}>
          Update Price
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SetPriceModal;
