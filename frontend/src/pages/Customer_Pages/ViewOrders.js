import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideNavbar from "./CustomerSideNavbar";
import Background from "../Background";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("customer-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to view your orders.");
      navigate("/"); // Redirect to login page
      return;
    }

    axios
      .get("https://inventory-management-rest-api-mongo-db.onrender.com/api/orders/customer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data.orders); // Update to correctly handle the API response
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [navigate]);

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("customer-jwtToken");

      if (!token) {
        console.error("No token found, redirecting to landing page.");
        navigate("/");
        return;
      }

      await axios.post(
        "https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("customer-jwtToken");
      alert("You have been logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="d-flex">
      <Background />
      <SideNavbar handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="container mt-4" style={{ marginLeft: "270px", width: "80%", backdropFilter: "blur(5px)" }}>
        <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
          Your Orders
        </h1>
        <div className="row">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="col-md-4 mb-4">
                <div className="card p-3" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px" }}>
                  <h4 className="fw-bold">Order ID: {order._id}</h4>
                  <p>Products:</p>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product._id}>
                        <strong>Product Name:</strong> {product.product?.name || "N/A"}<br />
                        <strong>Product Price:</strong> ${product.product?.price || "N/A"}<br />
                        <strong>Quantity:</strong> {product.quantity}
                      </li>
                    ))}
                  </ul>
                  <p className="fw-bold text-primary">Total Bill: ${order.totalAmount}</p>
                  <p>Status: {order.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;
