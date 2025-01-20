import React from "react";
import sidebarLogo from "/title-img.png";
import "./ConsumerSidebar.css";

function ConsumerSidebar({ onSectionChange }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={sidebarLogo} alt="Logo" />
        <h2>Agro Bazaar</h2>
      </div>
      <ul className="sidebar-nav-links">
        <li onClick={() => onSectionChange("dashboard")}>Dashboard</li>
        <li onClick={() => onSectionChange("buyproducts")}>Buy Products</li>
      </ul>
    </div>
  );
}

export default ConsumerSidebar;
