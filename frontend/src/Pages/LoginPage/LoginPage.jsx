import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin.jsx";
import InputField from "./InputField.jsx";
import "./LoginPage.css";

function LoginPage() {
  const [userType, setUserType] = useState(""); // "customer" or "seller"
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Redirect to appropriate page based on user type
    if (userType === "customer") {
      navigate("/consumer");
    } else if (userType === "seller") {
      navigate("/farmer");
    }
  };

  if (!userType) {
    // Initial selection page
    return (
      <div className="selection-page">
        <div className="user-selection-container">
          <h2>Select Account Type</h2>
          <div className="user-buttons">
            <button
              onClick={() => setUserType("customer")}
              className="user-button"
            >
              Log in as Customer
            </button>
            <button
              onClick={() => setUserType("seller")}
              className="user-button"
            >
              Log in as Seller
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login form for the selected user type
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="form-title">
          Log in as {userType === "customer" ? "Customer" : "Seller"}
        </h2>
        <SocialLogin />
        <p className="separator">
          <span>or</span>
        </p>
        <form onSubmit={handleLogin} className="login-form">
          <InputField type="email" placeholder="Email address" />
          <InputField type="password" placeholder="Password" />
          <a href="#" className="forgot-password-link">
            Forgot password?
          </a>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="signup-prompt">
          Don&apos;t have an account?{" "}
          <a href="#" className="signup-link">
            Sign up
          </a>
        </p>
        <button onClick={() => setUserType("")} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
