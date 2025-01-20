import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import profileLogo from '../../assets/review-logo-3.png';
import { auth, db } from "../../firebase/firebase.js";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import "./ConsumerHeader.css";

function ConsumerHeader() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch user data from the "user" collection
        const userQuery = query(collection(db, "user"), where("uid", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          setUserData(userDoc.data());
          // Store user data in local storage
          localStorage.setItem("username", JSON.stringify(userDoc.data()));
        } else {
          console.log("No such document in 'user' collection!");
        }
      }
    };

    fetchUserData();
  }, []);

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("username"));

  // Logout handler
  const handleLogout = () => {
    navigate("/"); // Redirect to home page
  };

  // Handle opening/closing the dialog
  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupportDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation if needed
    if (
      !supportDetails.name ||
      !supportDetails.email ||
      !supportDetails.message
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("https://your-backend-url.com/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supportDetails),
      });

      if (response.ok) {
        alert("Your support request has been sent!");
        setSupportDetails({ name: "", email: "", message: "" });
        toggleDialog();
      } else {
        alert("Failed to send support request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="farmer-header">
      <div className="farmer-header-details">
        <div className="profile-info">
          <img src={profileLogo} alt="Profile" className="profile-image" />
          <div>
            <h2>{user ? user.username : "Loading..."}</h2>
          </div>
        </div>
      </div>
      <div className="farmer-header-buttons">
        <button className="login-btn" onClick={handleLogout}>
          LogOut
        </button>
        <button className="login-btn" onClick={toggleDialog}>
          Customer Support
        </button>
      </div>

      {isDialogOpen && (
        <>
          <div className="dialog-overlay" onClick={toggleDialog}></div>
          <div className="support-dialog">
            <div className="dialog-content">
              <h3>Customer Support</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={supportDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={supportDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Message:
                  <textarea
                    name="message"
                    value={supportDetails.message}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <div className="dialog-actions">
                  <button type="submit" className="submit-btn">
                    Send
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={toggleDialog}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ConsumerHeader;
