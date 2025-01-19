import React from "react";
import { rentals } from "./Rentaldata.js";
import './RentalItem.css';

function RentalItems({ onSelectRental }) {
  return (
    <div className="product-list">
      {rentals.map((rental) => (
        <div
          key={rental.rentalId}
          className="product-card"
          onClick={() => onSelectRental(rental)} // Notify parent of selected rental
        >
          <img src={rental.image} alt={rental.name} className="product-image" />
          <h2>{rental.name}</h2>
          <p>Price: {rental.price}</p>
          <p>Start Date: {rental.startDate}</p>
          <p>End Date: {rental.endDate}</p>
          <p>Seller: {rental.seller}</p>
        </div>
      ))}
    </div>
  );
}

export default RentalItems;
