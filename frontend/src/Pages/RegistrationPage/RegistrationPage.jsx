import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegistrationPage.css";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    setError("");
    console.log("Form Submitted:", formData);
    // Backend integration here
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign-up initiated");
    // Implement Google sign-up logic
  };

  const handleAppleSignUp = () => {
    console.log("Apple sign-up initiated");
    // Implement Apple sign-up logic
  };

  return (
    <div className="registration-page-container">
      <div className="registration-page">
      <h2 className="registration-header">Sign Up</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">--Select Role--</option>
            <option value="consumer">Consumer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button">
          Register
        </button>
      </form>

      <div className="social-signup">
        <button className="google-button" onClick={handleGoogleSignUp}>
          Google
        </button>
        <button className="apple-button" onClick={handleAppleSignUp}>
          Apple
        </button>
      </div>
      <p className="login-prompt">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Log in
        </Link>
      </p>
    </div>
    </div>
  );
}
