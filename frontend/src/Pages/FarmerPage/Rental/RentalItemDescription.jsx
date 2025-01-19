import React from "react";
import "./RentalItemDescription.css";

function RentalItemDescription({ rental }) {
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
      <img src={rental.image} alt={rental.name} className="detail-image" />
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
      <button className="set-price-button">Get On Rent</button>
    </div>
  );
}

export default RentalItemDescription;
