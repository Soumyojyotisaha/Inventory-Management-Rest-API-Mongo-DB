import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierSideNavbar from "./SupplierSideNavbar";
import Background from "../Background";

function ViewCustomerBase() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10; // Number of customers per page
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to view customer details.");
      navigate("/supplier-login"); // Redirect to login page
      return;
    }

    axios
      .get("https://inventory-management-rest-api-mongo-db.onrender.com/api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Sort customers by creation date (most recent first)
        const sortedCustomers = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCustomers(sortedCustomers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
        setLoading(false);
      });
  }, [navigate]);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const nextPage = () => {
    if (indexOfLastCustomer < customers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex">
      <Background />
      <SupplierSideNavbar />

      <div className="container mt-4" style={{ marginLeft: "270px", width: "80%", backdropFilter: "blur(5px)" }}>
        <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
          Customer Details
        </h1>
        <div className="row">
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <div key={customer._id} className="col-md-4 mb-4">
                <div className="card p-3" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
                  <h4 className="fw-bold">Name: {customer.name}</h4>
                  <p>Email: {customer.email}</p>
                  <p style={{ color: customer.twoFactorEnabled ? "red" : "green" }}>
                    Two-Factor Enabled: {customer.twoFactorEnabled ? "Yes" : "No"}
                  </p>
                  <p><strong>Created At:</strong> {new Date(customer.createdAt).toLocaleDateString()} {new Date(customer.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No customer details found.</p>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-sm btn-primary mx-5" onClick={prevPage} disabled={currentPage === 1}>
            &larr;
          </button>
          <span className="fw-bold px-3 py-2" style={{ backgroundColor: "rgb(0, 123, 255)", color: "white", borderRadius: "5px" }}>
            Page {currentPage}
          </span>
          <button className="btn btn-sm btn-primary mx-5" onClick={nextPage} disabled={indexOfLastCustomer >= customers.length}>
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewCustomerBase;