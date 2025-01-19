import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, db, createUserWithEmailAndPassword } from "../../firebase/firebase.js";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import "./RegistrationPage.css";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    setError("");
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user data in Firestore under "users" collection
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
        role: formData.role,
      });
      console.log("User data saved to Firestore:", {
        username: formData.username,
        email: formData.email,
        role: formData.role,
      });

      // Optionally add to a different "user" collection
      const userReference = collection(db, "user");
      await addDoc(userReference, {
        uid: user.uid,
        username: formData.username,
        email: formData.email,
        role: formData.role,
      });
      console.log("User data also saved to 'user' collection:", {
        uid: user.uid,
        username: formData.username,
        email: formData.email,
        role: formData.role,
      });

      // Success notification and navigation
      toast.success("User created successfully!");
      setFormData({ username: "", email: "", password: "", role: "" });
      navigate("/login"); // Navigate to the login page
    } catch (error) {
      setError(error.message);
      console.error("Error saving user data:", error);
    }
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
            <option value="consumer">Customer</option>
            <option value="seller">Farmer</option>
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
