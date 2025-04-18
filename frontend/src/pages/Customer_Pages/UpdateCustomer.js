import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideNavbar from "./CustomerSideNavbar";
import Background from "../Background";


function UpdateCustomer() {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("customer-jwtToken");


    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to view your profile.");
      navigate("/"); // Redirect to login page
      return;
    }


    axios.get("http://localhost:3000/api/customers/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Profile fetched:", response.data); // Log the response data
      setUser(response.data); // Update to correctly handle the API response
      setUpdatedUser(response.data); // Initialize updatedUser with current user data
    })
    .catch(error => {
      console.error("Error fetching profile:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        if (error.response.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/"); // Redirect to login page
        }
      } else {
        console.error("Error message:", error.message);
      }
    });
  }, [navigate]);


  const handleUpdateProfile = () => {
    const token = localStorage.getItem("customer-jwtToken");


    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to update your profile.");
      return;
    }


    axios.put("http://localhost:3000/api/customers/profile", updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      alert("Profile updated successfully!");
      setUser(updatedUser); // Update user state with the new data
    })
    .catch(error => {
      console.error("Error updating profile:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      alert(`Failed to update profile. Error: ${errorMessage}`);
    });
  };


  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("customer-jwtToken");


      if (!token) {
        console.error("No token found, redirecting to landing page.");
        alert("You need to log in to log out.");
        return;
      }


      await axios.post(
        "http://localhost:3000/api/customers/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      localStorage.removeItem("customer-jwtToken");
      alert("You have been logged out successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <div className="d-flex">
      <Background />
      <SideNavbar handleLogout={handleLogout} />


      {/* Main Content */}
      <div className="container mt-4" style={{ marginLeft: "270px", width: "60%", backdropFilter: "blur(5px)" }}>
        <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2rem", color: "rgb(51, 51, 51)" }}>
          Update Profile
        </h1>
        {user ? (
          <div className="card p-3" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px" }}>
            <h4 className="fw-bold">User Details</h4>
            <div className="mb-3">
              <label className="form-label"><strong>Name:</strong></label>
              <input
                type="text"
                className="form-control"
                value={updatedUser.name}
                onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><strong>Email:</strong></label>
              <input
                type="email"
                className="form-control"
                value={updatedUser.email}
                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              />
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleUpdateProfile}>
              Update Profile
            </button>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
}


export default UpdateCustomer;



