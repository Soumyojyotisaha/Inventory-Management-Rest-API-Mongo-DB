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
      const response = await axios.post("http://localhost:3000/api/suppliers/register", {
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
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed! Check console for details.");
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
        Welcome to <span style={{ color: "rgb(0, 123, 255)" }}>Inventory Hub</span>
      </h1>
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
        <button type="submit" className="btn btn-success w-100">Signup</button>
      </form>
    </div>
  );
}

export default SupplierSignup;
