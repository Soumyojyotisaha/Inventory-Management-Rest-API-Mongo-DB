import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideNavbar from "./CustomerSideNavbar";
import Background from "../Background";

function DeleteProfile() {
  const [user, setUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("customer-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to view your profile.");
      navigate("/"); // Redirect to login page
      return;
    }

    axios
      .get("https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Profile fetched:", response.data); // Log the response data
        setUser(response.data); // Update to correctly handle the API response
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [navigate]);

  const handleDeleteProfile = () => {
    const token = localStorage.getItem("customer-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to delete your profile.");
      return;
    }

    axios
      .delete("https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Profile deleted successfully!");
        localStorage.removeItem("customer-jwtToken");
        navigate("/"); // Redirect to landing page
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
        alert(`Failed to delete profile. Error: ${errorMessage}`);
      });
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("customer-jwtToken");

      if (!token) {
        console.error("No token found, redirecting to landing page.");
        alert("You need to log in to log out.");
        return;
      }

      await axios.post(
        "https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/logout",
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
    <div className="d-flex flex-column flex-lg-row">
      <Background />
      <SideNavbar handleLogout={handleLogout} />

      {/* Main Content */}
      <div
        className="container mt-4 d-flex justify-content-center align-items-center"
        style={{
          marginLeft: "270px",
          width: "100%",
          maxWidth: "90%",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h1
            className="mb-4 fw-bold text-center"
            style={{ fontSize: "2rem", color: "rgb(51, 51, 51)" }}
          >
            User Profile
          </h1>
          {user ? (
            <div
              className="card p-3 mx-auto"
              style={{
                backgroundColor: "#f8f9fa",
                boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)",
                borderRadius: "10px",
              }}
            >
              <h4 className="fw-bold">User Details</h4>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setConfirmDelete(true)}
              >
                Delete Profile
              </button>
              {confirmDelete && (
                <div className="confirm-delete mt-3">
                  <p>Are you sure you want to delete the profile?</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDeleteProfile}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setConfirmDelete(false)}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteProfile;