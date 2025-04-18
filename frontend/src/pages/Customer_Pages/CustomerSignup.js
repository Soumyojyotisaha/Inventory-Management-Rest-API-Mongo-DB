import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/customers/register", {
        name,
        email,
        password,
      });


      if (response.status === 201) {
        alert("Signup Successful! Please login.");
      }
    } catch (error) {
      alert("Signup Failed! Customer registered successfully. Just Login");
    } finally {
      navigate("/customer-login"); // Redirect to login page after signup attempt
    }
  };


  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)", backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
        Welcome to <span style={{ color: "rgb(0, 123, 255)" }}>Inventory Hub</span>
      </h1>
      <div className="card p-4" style={{ width: "500px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
        <h2 className="text-center" style={{ fontSize: "2rem", fontWeight: "bold", color: "rgb(51, 51, 51)" }}>
          Customer Signup
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
            onClick={() => navigate("/customer-login")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}


export default Signup;





