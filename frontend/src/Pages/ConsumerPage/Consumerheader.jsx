import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import profileLogo from '../../assets/review-logo-3.png';
import "./ConsumerHeader.css";

function FarmerHeader() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogout = () => {
    // You can perform any logout logic here (e.g., clearing authentication tokens)
    navigate("/"); // Redirect to home page ("/")
  };

  return (
    <div className="farmer-header">
      <div className="farmer-header-details">
        <div className="profile-info">
          <img
            src={profileLogo} // Replace with dynamic profile image URL
            alt="Profile"
            className="profile-image"
          />
          <div>
            <h2>Mina Maskole</h2>
          </div>
        </div>
        
      </div>
      <div className="farmer-header-buttons">
        <button className="login-btn" onClick={handleLogout}>LogOut</button> {/* Attach the handleLogout function */}
        <button className="login-btn">Customer Support</button>
      </div>
    </div>
  );
}

export default FarmerHeader;
