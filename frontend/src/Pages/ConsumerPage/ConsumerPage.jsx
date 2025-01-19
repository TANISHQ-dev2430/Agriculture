import React, { useState } from "react";
import ConsumerSidebar from './ConsumerSidebar.jsx';
import ConsumerHeader from './ConsumerHeader.jsx';
import RecentPurchases from './RecentPurchases.jsx';
import BuyProducts from './BuyProducts/BuyProducts.jsx';
import CartPage from './CartPage/CartPage.jsx';
import "./ConsumerPage.css";

function ConsumerPage() {
  const [activeSection, setActiveSection] = useState("dashboard"); // State to manage active content

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <ConsumerHeader />
            <RecentPurchases />
          </>
        );
      case "buyproducts":
        return <BuyProducts />;
      case "cartpage":
        return <CartPage />;
    }
  };

  return (
    <div className="farmer-page-body">
        <div className="farmer-page">
            <ConsumerSidebar onSectionChange={setActiveSection} />
            <div className="main-content">{renderContent()}</div>
        </div>
    </div>
  );
}

export default ConsumerPage;
