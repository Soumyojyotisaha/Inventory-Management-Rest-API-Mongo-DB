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
      }}
    >
      <h2 className="fw-bold">
        <Link to="/supplier-dashboard" className="text-white text-decoration-none">
          📊 Supplier Dashboard
        </Link>
      </h2>
      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/add-product" className="text-white text-decoration-none fw-bold">
            ➕ Add Product
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/update-product" className="text-white text-decoration-none fw-bold">
            ✏️ Update Product
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/delete-product-from-stock" className="text-white text-decoration-none fw-bold">
            🗑️ Delete Product
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/update-stock" className="text-white text-decoration-none fw-bold">
            📈 Update Stock
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/update-order-status" className="text-white text-decoration-none fw-bold">
            📦 Update Order Status
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/get-all-order-details" className="text-white text-decoration-none fw-bold">
            📋 Get All Order Details
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/view-customer-base" className="text-white text-decoration-none fw-bold">
            👥 View Customer Base
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/toggle-2fa" className="text-white text-decoration-none fw-bold">
            🔒 Toggle 2FA
          </Link>
        </li>
        {/* <li className="mb-3">
          <Link to="/verify-otp-2fa" className="text-white text-decoration-none fw-bold">
            ✅ Verify OTP for 2FA
          </Link>
        </li> */}
        <li className="mb-3">
          <Link to="/forgot-supplier-password" className="text-white text-decoration-none fw-bold">
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


export default SupplierSideNavbar;





