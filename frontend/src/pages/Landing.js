import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Title */}
      <h1 className="mb-4 fw-bold" style={{ fontSize: "2.5rem", color: "#333" }}>
        Welcome to <span style={{ color: "#007bff" }}>Inventory Hub</span>
      </h1>

      <div className="row w-75 shadow-lg rounded p-4 bg-white">
        {/* Left Side - Customer & Supplier Options */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center p-5">
          <h2 className="mb-4">Choose Your Role</h2>
          <button className="btn btn-primary w-75 mb-3" onClick={() => navigate("/customer-signup")}>
            Customer
          </button>
          <button className="btn btn-primary w-75" onClick={() => navigate("/supplier-signup")}>
            Supplier
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src="/store-bg.avif"
            alt="Store Illustration"
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
