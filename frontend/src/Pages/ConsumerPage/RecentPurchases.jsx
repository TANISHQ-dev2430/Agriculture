import React from "react";
import { purchaseData } from "./data";
import "./RecentPurchases.css";

function RecentPurchases() {
  return (
    <div className="recent-sales">
      <h2>Recent Purchases</h2>
      <div className="sales-grid">
        {purchaseData.map((sale, index) => (
          <div key={index} className="sale-card">
            <p><strong>Item:</strong> {sale.item}</p>
            <p><strong>Price:</strong> {sale.price}</p>
            <p><strong>Quantity:</strong> {sale.quantity}</p>
            <p><strong>Seller:</strong> {sale.seller}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentPurchases;
