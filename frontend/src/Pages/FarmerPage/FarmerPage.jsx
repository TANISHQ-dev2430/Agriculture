import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import RecentSales from "./RecentSales.jsx";
import FarmerHeader from "./FarmerHeader.jsx";
import WeatherAlerts from "./WeatherAlerts.jsx"; // Component for Weather Alerts content
import MyProducts from "./MyProducts/MyProducts.jsx";
import Rental from "./Rental/Renatl.jsx"; // Component for Rental content
import "./FarmerPage.css";

function FarmerPage() {
  const [activeSection, setActiveSection] = useState("dashboard"); // State to manage active content

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <FarmerHeader />
            <RecentSales />
          </>
        );
      case "weather":
        return <WeatherAlerts />;
      case "myproducts":
        return <MyProducts />;
      case "rental":
        return <Rental />;
    }
  };

  return (
    <div className="farmer-page-body">
        <div className="farmer-page">
            <Sidebar onSectionChange={setActiveSection} />
            <div className="main-content">{renderContent()}</div>
        </div>
    </div>
  );
}

export default FarmerPage;
