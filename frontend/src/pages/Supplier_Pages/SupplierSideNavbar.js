import React from "react";
import { Link } from "react-router-dom";

function SupplierSideNavbar({ handleLogout }) {
  return (
    <div
      className="sidebar"
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "rgb(0, 123, 255)",
        color: "white",
        position: "fixed",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)", // Added shadow for better appearance
      }}
    >
      <h2 className="fw-bold">
        <Link
          to="/supplier-dashboard"
          className="text-white text-decoration-none"
          style={{
            transition: "transform 0.2s",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          }}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          📊 Supplier Dashboard
        </Link>
      </h2>
      <ul className="list-unstyled mt-4">
        <li className="mb-3">
          <Link
            to="/add-product"
            className="text-white text-decoration-none fw-bold"
            style={{ transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            ➕ Add Product
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/update-product"
            className="text-white text-decoration-none fw-bold"
            style={{ transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            ✏️ Update Product
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/delete-product-from-stock"
            className="text-white text-decoration-none fw-bold"
            style={{ transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            🗑️ Delete Product
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/update-stock"
            className="text-white text-decoration-none fw-bold"
            style={{ transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            📈 Update Stock
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/update-order-status"
            className="text-white text-decoration-none fw-bold"
            style={{ transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            📦 Update Order Status
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/get-all-order-details"
            className="text-white text-decoration-none fw-bold"
            style={{ transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            📋 Get All Order Details
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/view-customer-base"
            className="text-white text-decoration-none fw-bold"
            style={{ transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            👥 View Customer Base
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/toggle-2fa"
            className="text-white text-decoration-none fw-bold"
            style={{ transition: "all 0.2s" }}
            onMouseEnter={(e) => (e.target.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)")}
            onMouseLeave={(e) => (e.target.style.textShadow = "none")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            🔒 Toggle 2FA
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/forgot-supplier-password"
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
  );
}

export default SupplierSideNavbar;