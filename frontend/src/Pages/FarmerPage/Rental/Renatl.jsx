import React, { useState } from "react";
import RentalItemDescription from "./RentalItemDescription";
import RentalItems from "./RentalItems";
import "./Rental.css";

export default function Rental() {
  const [selectedRental, setSelectedRental] = useState(null); // State to track the selected rental

  const handleSelectRental = (rental) => {
    setSelectedRental(rental); // Update state with selected rental
  };

  return (
    <div className="rental-page">
      <h2 className="rental-page-header">AgroBazaar Rentals</h2>
      <div className="rental-page-content">
        <RentalItems onSelectRental={handleSelectRental} />
        <RentalItemDescription rental={selectedRental} />
      </div>
    </div>
  );
}
