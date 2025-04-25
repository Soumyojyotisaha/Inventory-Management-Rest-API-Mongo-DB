import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierSideNavbar from "./SupplierSideNavbar";
import Background from "../Background";


function Toggle2FA() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("supplier-jwtToken");


    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to toggle 2FA.");
      navigate("/supplier-login"); // Redirect to login page
      return;
    }


    axios.get("https://inventory-management-rest-api-mongo-db.onrender.com/api/customers", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setCustomers(response.data); // Update to correctly handle the API response
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching customer details:", error);
      setLoading(false);
    });
  }, [navigate]);


  const handleToggle2FA = async () => {
    const token = localStorage.getItem("supplier-jwtToken");


    try {
      const response = await axios.post(
        "https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/toggle-2fa",
        { email: selectedCustomer.email, enable: !selectedCustomer.twoFactorEnabled },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      console.log(response.data); // Print the API response in the console


      if (response.status === 200) {
        const updatedCustomer = { ...selectedCustomer, twoFactorEnabled: !selectedCustomer.twoFactorEnabled };
        setSelectedCustomer(updatedCustomer);
        setCustomers(prevCustomers => prevCustomers.map(customer =>
          customer.email === selectedCustomer.email ? updatedCustomer : customer
        ));
        alert("Two-Factor Authentication status updated successfully!");
      } else {
        alert("Failed to update 2FA status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating 2FA status:", error);
      alert("Failed to update 2FA status. Please try again.");
    }
  };


  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className="d-flex">
      <Background />
      <SupplierSideNavbar />


      <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ marginLeft: "270px", width: "100%", maxWidth: "90%", backdropFilter: "blur(5px)" }}>
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
            Toggle Two-Factor Authentication
          </h1>
          <div className="mb-3">
            <label style={{ fontWeight: "bold" }}>Select Customer Email:</label>
            <select
              className="form-control"
              value={selectedCustomer ? selectedCustomer.email : ""}
              onChange={(e) => setSelectedCustomer(customers.find(customer => customer.email === e.target.value))}
            >
              <option value="" disabled>Select an email</option>
              {customers.map(customer => (
                <option key={customer._id} value={customer.email}>{customer.email}</option>
              ))}
            </select>
          </div>
          {selectedCustomer && (
            <div className="card p-3 mx-auto" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px", maxWidth: "600px" }}>
              <h4 className="fw-bold">Name: {selectedCustomer.name}</h4>
              <p>Email: {selectedCustomer.email}</p>
              <p style={{ color: selectedCustomer.twoFactorEnabled ? "red" : "green" }}>
                Two-Factor Enabled: {selectedCustomer.twoFactorEnabled ? "Yes" : "No"}
              </p>
              <button className="btn btn-primary" onClick={handleToggle2FA}>
                Toggle Two-Factor Authentication
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default Toggle2FA;



