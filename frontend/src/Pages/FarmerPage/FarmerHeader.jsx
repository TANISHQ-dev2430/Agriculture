import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import profileLogo from '../../assets/review-logo-3.png';
import { auth, db } from "../../firebase/firebase.js";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import "./FarmerHeader.css";

function FarmerHeader() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        console.log("User is authenticated:", user);
        // Fetch user data from the "users" collection
        const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          setUserData(userDoc.data());
          // Store user data in local storage
          localStorage.setItem("username", JSON.stringify(userDoc.data()));
          console.log("User data fetched and stored in local storage:", userDoc.data());
        } else {
          console.log("No such document in 'users' collection!");
        }
      } else {
        console.log("No authenticated user found.");
      }
    };

    fetchUserData();
  }, []);

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("username"));
  console.log("User data retrieved from local storage:", user);

  const handleLogout = () => {
    auth.signOut();
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
            <h2>{user ? user.username : "Loading..."}</h2>
          </div>
        </div>
        <div className="statistics">
          <div className="stat-box">
            <h3>Sales</h3>
            <p>62% of Total Products</p>
          </div>
          <div className="stat-box">
            <h3>Rating</h3>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
          <div className="stat-box">
            <h3>Revenue</h3>
            <p>150,696 Rs.</p>
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
