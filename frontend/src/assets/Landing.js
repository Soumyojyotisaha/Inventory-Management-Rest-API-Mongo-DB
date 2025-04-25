import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: "url('/background.jpg')", // Replace with your background image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Title */}
      <h1
        className="mb-4 fw-bold text-center"
        style={{
          fontSize: "2.5rem",
          color: "#333",
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "10px",
        }}
      >
        Welcome to <span style={{ color: "#007bff" }}>Inventory Hub</span>
      </h1>

      <div
        className="row shadow-lg rounded p-4 bg-white w-100"
        style={{
          maxWidth: "900px",
          borderRadius: "15px",
        }}
      >
        {/* Left Side - Customer & Supplier Options */}
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center p-4">
          <h2
            className="mb-4 text-center"
            style={{
              fontWeight: "bold", // Make the text bold
            }}
          >
            Choose Your Role
          </h2>
          <button
            className="btn btn-primary w-100 mb-3"
            onClick={() => navigate("/customer-signup")}
          >
            Customer
          </button>
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/supplier-signup")}
          >
            Supplier
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img
            src="/store-bg.avif"
            alt="Store Illustration"
            className="img-fluid rounded"
            style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "black",
          fontSize: "0.9rem",
        }}
      >
        Made by Soumyojyoti Saha
      </div>
    </div>
  );
}

export default Landing;
