import React from "react";
import { Link } from "react-router-dom";


function SideNavbar({ handleLogout }) {
  return (
    <div
      className="sidebar"
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "rgb(0, 123, 255)",
        color: "white",
        position: "fixed",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h2 className="fw-bold">
        <Link to="/customer-dashboard" className="text-white text-decoration-none">
          📊Customer Dashboard
        </Link>
      </h2>
      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/update-customer" className="text-white text-decoration-none fw-bold">
            ✏️ Update Profile
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/delete-profile" className="text-white text-decoration-none fw-bold">
            🗑️ Delete Profile
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/place-order" className="text-white text-decoration-none fw-bold">
            🛒 Place Order
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/view-orders" className="text-white text-decoration-none fw-bold">
            📦 View Orders
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/cancel-order" className="text-white text-decoration-none fw-bold">
            ❌ Cancel Order
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/forgot-password" className="text-white text-decoration-none fw-bold">
            🔑 Forgot Password
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="btn btn-link text-white text-decoration-none fw-bold p-0" style={{ textAlign: "left" }}>
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
}


export default SideNavbar;





