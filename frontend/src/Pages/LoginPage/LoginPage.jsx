import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.js"; // Import fireDB
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods
import { toast } from "react-hot-toast"; // For notifications
import SocialLogin from "./SocialLogin.jsx";
import InputField from "./InputField.jsx";
import "./LoginPage.css";

function LoginPage() {
  const [userType, setUserType] = useState(""); // "consumer" or "seller"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Login initiated");

    // Validation for empty fields
    if (!email || !password) {
      toast.error("All fields are required.");
      console.log("Empty fields");
      return;
    }

    try {
      console.log("Attempting login...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential);

      const user = userCredential.user;
      console.log("Fetching user data for UID:", user.uid);

      // Firestore query to fetch user data
      const q = query(collection(db, "user"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
        console.log("User data:", userData);
      });

      if (!userData) {
        toast.error("User data not found.");
        return;
      }

      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login successful!");

      // Navigate based on user type
      if (userType === "consumer") {
        navigate("/consumer");
      } else if (userType === "seller") {
        navigate("/farmer");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
      toast.error("Login failed: " + err.message);
    }
  };

  if (!userType) {
    // Initial selection page
    return (
      <div className="selection-page">
        <div className="user-selection-container">
          <h2>Select Account Type</h2>
          <div className="user-buttons">
            <button onClick={() => setUserType("consumer")} className="user-button">
              Log in as Consumer
            </button>
            <button onClick={() => setUserType("seller")} className="user-button">
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
          Log in as {userType === "consumer" ? "Consumer" : "Seller"}
        </h2>
        <SocialLogin />
        <p className="separator">
          <span>or</span>
        </p>
        <form onSubmit={handleLogin} className="login-form">
          <InputField
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>} {/* Display error */}
          <a href="/forgot-password" className="forgot-password-link">
            Forgot password?
          </a>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="signup-prompt">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="signup-link">
            Sign up
          </Link>
        </p>
        <button onClick={() => setUserType("")} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
