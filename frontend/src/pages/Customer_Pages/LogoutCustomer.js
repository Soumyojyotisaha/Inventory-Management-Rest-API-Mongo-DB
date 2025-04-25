import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutCustomer() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("customer-jwtToken"); // Retrieve the JWT token

      if (!token) {
        console.error("No token found, redirecting to login.");
        alert("No token found, redirecting to login page.");
        navigate("/customer-login");
        return;
      }

      // Send logout request
      await axios.post(
        "https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );

      // Clear token from localStorage
      localStorage.removeItem("customer-jwtToken");

      // Redirect to login page
      alert("You have been logged out successfully!");
      navigate("/customer-login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutCustomer;