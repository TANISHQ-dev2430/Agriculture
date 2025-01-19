import React from "react";
import { salesData } from "./data";
import "./RecentSales.css";

function RecentSales() {
  return (
    <div className="recent-sales">
      <h2>Recent Sales</h2>
      <div className="sales-grid">
        {salesData.map((sale, index) => (
          <div key={index} className="sale-card">
            <p><strong>Item:</strong> {sale.item}</p>
            <p><strong>Price:</strong> {sale.price}</p>
            <p><strong>Quantity:</strong> {sale.quantity}</p>
            <p><strong>Buyer:</strong> {sale.buyer}</p>
            <p><strong>Location:</strong> {sale.location}</p>
            <p><strong>Date:</strong> {sale.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentSales;
