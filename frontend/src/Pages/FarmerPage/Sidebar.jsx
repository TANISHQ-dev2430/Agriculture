import React from "react";
import sidebarLogo from "/title-img.png";
import "./Sidebar.css";

function Sidebar({ onSectionChange }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={sidebarLogo} alt="Logo" />
        <h2>Agro Bazaar</h2>
      </div>
      <ul className="sidebar-nav-links">
        <li onClick={() => onSectionChange("dashboard")}>Dashboard</li>
        <li onClick={() => onSectionChange("myproducts")}>MyProducts</li>
        <li onClick={() => onSectionChange("rental")}>Rental</li>
      </ul>
    </div>
  );
}

export default Sidebar;
