import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogoutCustomer() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the JWT token

        if (!token) {
          console.error("No token found, redirecting to login.");
          navigate("/login");
          return;
        }

        // Send logout request
        await axios.post(
          "http://localhost:3000/api/customers/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
          }
        );

        // Clear token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h3 className="text-primary">Logging out...</h3>
    </div>
  );
}

export default LogoutCustomer;
