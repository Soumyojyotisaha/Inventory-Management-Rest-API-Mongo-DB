import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierSideNavbar from "./SupplierSideNavbar";
import Background from "../Background";

function GetAllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 9; // Number of orders per page
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to view the orders.");
      navigate("/supplier-login"); // Redirect to login page
      return;
    }

    axios.get("https://inventory-management-rest-api-mongo-db.onrender.com/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // Sort orders by date (most recent first)
        const sortedOrders = response.data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [navigate]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const nextPage = () => {
    if (indexOfLastOrder < orders.length) {
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
          Customer Orders
        </h1>
        <div className="row">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <div key={order._id} className="col-md-4 mb-4">
                <div className="card p-3" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px" }}>
                  <h4 className="fw-bold">Customer Name: {order.customer?.name || "Unknown"}</h4>
                  <p>Email: {order.customer?.email || "Unknown"}</p>
                  <p>Product Name: {order.products[0]?.product?.name || "Unknown"}</p>
                  <p>Product Quantity: {order.products[0]?.quantity || "Unknown"}</p>
                  <p className="fw-bold text-primary">Total Bill: ${order.totalAmount}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date(order.createdAt).toLocaleTimeString()}</p>
                  <p style={{ color: "green" }}>Status: {order.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-sm btn-primary mx-5" onClick={prevPage} disabled={currentPage === 1}>
            &larr;
          </button>
          <span className="fw-bold px-3 py-2" style={{ backgroundColor: "rgb(0, 123, 255)", color: "white", borderRadius: "5px" }}>
            Page {currentPage}
          </span>
          <button className="btn btn-sm btn-primary mx-5" onClick={nextPage} disabled={indexOfLastOrder >= orders.length}>
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetAllOrders;