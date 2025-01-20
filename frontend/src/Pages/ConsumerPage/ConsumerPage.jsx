import React, { useState } from "react";
import { CartProvider } from "./CartPage/CartContext.jsx";
import ConsumerSidebar from "./ConsumerSidebar";
import ConsumerHeader from "./ConsumerHeader";
import RecentPurchases from "./RecentPurchases";
import BuyProducts from "./BuyProducts/BuyProducts.jsx";
import CartPage from "./CartPage/CartPage.jsx";

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
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <CartProvider>
      <div className="farmer-page-body">
        <div className="farmer-page">
          <ConsumerSidebar onSectionChange={setActiveSection} />
          <div className="main-content">{renderContent()}</div>
        </div>
      </div>
    </CartProvider>
  );
}

export default ConsumerPage;