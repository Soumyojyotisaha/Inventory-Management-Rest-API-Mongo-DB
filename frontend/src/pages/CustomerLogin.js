import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/customers/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login Successful!");
        navigate("/customer-dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
        Welcome to <span style={{ color: "rgb(0, 123, 255)" }}>Inventory Hub</span>
      </h1>
      <h2 className="text-center" style={{ fontSize: "2rem", fontWeight: "bold", color: "rgb(51, 51, 51)" }}>
        Customer Login
      </h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
