import React, { useState } from "react";
import axios from "axios";
import SideNavbar from "./CustomerSideNavbar";
import Background from "../Background";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Request reset, Step 2: Reset password


  const handleForgotPassword = () => {
    const jwtToken = localStorage.getItem("customer-jwtToken");


    if (!jwtToken) {
      alert("You need to log in to request a password reset.");
      return;
    }


    axios.post("https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/forgot-password", { email }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    .then(response => {
      alert("Password reset email sent! Please check your inbox.");
      setStep(2); // Move to the next step
    })
    .catch(error => {
      console.error("Error sending password reset email:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      alert(`Failed to send password reset email. Error: ${errorMessage}`);
    });
  };


  const handleResetPassword = () => {
    axios.post("https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/reset-password", { newPassword, token })
      .then(response => {
        alert("Password reset successfully!");
        setEmail("");
        setToken("");
        setNewPassword("");
        setStep(1); // Reset to the initial step
      })
      .catch(error => {
        console.error("Error resetting password:", error);
        const errorMessage = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
        alert(`Failed to reset password. Error: ${errorMessage}`);
      });
  };


  return (
    <div className="d-flex">
      <Background />
      <SideNavbar />
      <div className="container mt-4 d-flex flex-column align-items-center" style={{ marginLeft: "270px", width: "100%", maxWidth: "90%", backdropFilter: "blur(5px)" }}>
        <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2rem", color: "rgb(51, 51, 51)" }}>
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h1>
        {step === 1 ? (
          <div className="card p-3" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px", width: "100%", maxWidth: "500px" }}>
            <div className="mb-3">
              <label className="form-label"><strong>Email:</strong></label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleForgotPassword}>
              Send Reset Email
            </button>
          </div>
        ) : (
          <div className="card p-3" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px", width: "100%", maxWidth: "500px" }}>
            <div className="mb-3">
              <label className="form-label"><strong>Token:</strong></label>
              <input
                type="text"
                className="form-control"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><strong>New Password:</strong></label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


export default ForgotPassword;



