import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function SupplierSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post("https://inventory-management-rest-api-mongo-db.onrender.com/api/suppliers/register", {
        name,
        email,
        password,
      });


      if (response.status === 201) {
        alert("Signup Successful! Please log in.");
        navigate("/supplier-login");
      } else {
        alert("Signup failed! Try again.");
      }
    } catch (error) {
      if (error.response?.status === 409) { // Assuming 409 is the status code for "Conflict" (user already exists)
        alert("Supplier already exists! Redirecting to login.");
        navigate("/supplier-login");
      } else {
        console.error("Signup Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Signup failed! Check console for details.");
      }
    }
  };


  const handleRedirectToLandingPage = () => {
    navigate("/");
  };


  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh", position: "relative" }}>
      <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)", backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
        Welcome to <span style={{ color: "rgb(0, 123, 255)", cursor: "pointer" }} onClick={handleRedirectToLandingPage}>Inventory Hub</span>
      </h1>
      <div className="card p-4" style={{ width: "500px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
        <h2 className="text-center" style={{ fontSize: "2rem", fontWeight: "bold", color: "rgb(51, 51, 51)" }}>
          Supplier Signup
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-2">Signup</button>
          <div className="text-center mb-2" style={{ color: "black" }}>OR</div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => navigate("/supplier-login")}
          >
            Login
          </button>
        </form>
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


export default SupplierSignup;





