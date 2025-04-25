import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewCustomerDetails() {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const token = localStorage.getItem("customer-jwtToken");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get("https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        setError("Failed to fetch customer details. Please try again later.");
      }
    };

    fetchCustomerDetails();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
        Customer Profile
      </h2>
      {error && <p className="alert alert-danger">{error}</p>}
      {customer ? (
        <div className="card p-4 shadow-sm">
          <h4><strong>Name:</strong> {customer.name}</h4>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
          <p><strong>Address:</strong> {customer.address || "N/A"}</p>
        </div>
      ) : (
        !error && <p className="text-center">Loading customer details...</p>
      )}
    </div>
  );
}

export default ViewCustomerDetails;