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
        justifyContent: "space-between",
        zIndex: "1000",
        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)", // Added shadow for better appearance
      }}
    >
      <div>
        <h2 className="fw-bold">
          <Link
            to="/customer-dashboard"
            className="text-white text-decoration-none"
            style={{
              transition: "transform 0.2s",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            }}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            📊 Customer Dashboard
          </Link>
        </h2>
        <ul className="list-unstyled mt-4">
          <li className="mb-3">
            <Link
              to="/update-customer"
              className="text-white text-decoration-none fw-bold"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              ✏️ Update Profile
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/delete-profile"
              className="text-white text-decoration-none fw-bold"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              🗑️ Delete Profile
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/place-order"
              className="text-white text-decoration-none fw-bold"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              🛒 Place Order
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/view-orders"
              className="text-white text-decoration-none fw-bold"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              📦 View Orders
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/cancel-order"
              className="text-white text-decoration-none fw-bold"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              ❌ Cancel Order
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/forgot-password"
              className="text-white text-decoration-none fw-bold"
              style={{ transition: "all 0.2s" }}
              onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              🔑 Forgot Password
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="btn btn-link text-white text-decoration-none fw-bold p-0"
              style={{
                textAlign: "left",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
              onMouseLeave={(e) => (e.target.style.textShadow = "none")}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="text-center mt-4" style={{ color: "white", fontSize: "0.9rem" }}>
        Made By Soumyojyoti Saha
      </div>
    </div>
  );
}

export default SideNavbar;