import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOTP2fa() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/verify-otp", {
        email,
        otp,
      });

      const customerToken = response.data.token;
      localStorage.setItem("customer-jwtToken", customerToken);
      alert("OTP verified successfully!");
      navigate("/customer-dashboard");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-5" style={{ width: "500px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
        <h2 className="fw-bold text-center mb-4">Verify OTP</h2>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">OTP</label>
          <input
            type="text"
            className="form-control"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleVerifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default VerifyOTP2fa;