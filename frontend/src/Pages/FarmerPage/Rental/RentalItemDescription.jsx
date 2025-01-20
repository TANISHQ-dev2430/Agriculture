import React from "react";
import "./RentalItemDescription.css";

function RentalItemDescription({ rental }) {
  const handleRent = () => {
    alert(`Item Details:\nName: ${rental.name}\nPrice: ${rental.price}\nStart Date: ${rental.startDate}\nEnd Date: ${rental.endDate}\nSold by: ${rental.seller}`);
    alert("Purchase successful!");
  };

  if (!rental) {
    return (
      <div className="product-details">
        <h2>Select a Rental Item</h2>
        <p>Click on a rental item to view its details.</p>
      </div>
    );
  }

  return (
    <div className="product-details">
      <h2>{rental.name}</h2>
      <p>
        <strong>Price:</strong> {rental.price}
      </p>
      <p>
        <strong>Start Date:</strong> {rental.startDate}
      </p>
      <p>
        <strong>End Date:</strong> {rental.endDate}
      </p>
      <p>
        <strong>Sold by:</strong> {rental.seller}
      </p>
      <button className="set-price-button" onClick={handleRent}>Get On Rent</button>
    </div>
  );
}

export default RentalItemDescription;
