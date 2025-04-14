import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Display 9 products per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    if (indexOfLastProduct < filteredProducts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, redirecting to landing page.");
        navigate("/");
        return;
      }

      await axios.post(
        "http://localhost:3000/api/customers/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      alert("You have been logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="d-flex">
      {/* Customer Navbar */}
      <div
        className="sidebar"
        style={{
          width: "250px",
          height: "100vh",
          backgroundColor: "rgb(0, 123, 255)",
          color: "white",
          position: "fixed",
          padding: "20px",
        }}
      >
        <h2 className="fw-bold">Dashboard</h2>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/view-products" className="text-white text-decoration-none fw-bold">
              📦 View Products
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/forgot-password" className="text-white text-decoration-none fw-bold">
              🔑 Forgot Password
            </Link>
          </li>
          <li className="mb-3">
            <button onClick={handleLogout} className="btn btn-link text-white fw-bold p-0">
              🚪 Logout
            </button>
          </li>
          <li className="mb-3">
            <Link to="/delete-profile" className="text-white text-decoration-none fw-bold">
              🗑 Delete Profile
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/view-orders" className="text-white text-decoration-none fw-bold">
              📜 View Orders
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/cancel-order" className="text-white text-decoration-none fw-bold">
              ❌ Cancel Order
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/place-order" className="text-white text-decoration-none fw-bold">
              🛒 Place Order
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/update-profile" className="text-white text-decoration-none fw-bold">
              ✏️ Update Profile
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/view-profile" className="text-white text-decoration-none fw-bold">
              👤 View Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container mt-4" style={{ marginLeft: "270px", width: "80%" }}>
        <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
          Welcome to <span style={{ color: "rgb(0, 123, 255)" }}>Inventory Hub</span>
        </h1>
        <h2 className="text-center" style={{ fontSize: "2rem", fontWeight: "bold", color: "rgb(51, 51, 51)" }}>
          Customer Dashboard
        </h2>

        {/* Search Bar */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Product List */}
        <div className="row">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card p-3" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
                  <h4 className="fw-bold">{product.name}</h4>
                  <p>{product.description}</p>
                  <p className="fw-bold text-primary">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary" onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span className="fw-bold px-3 py-2" style={{ backgroundColor: "rgb(0, 123, 255)", color: "white", borderRadius: "5px" }}>
            Page {currentPage}
          </span>
          <button className="btn btn-primary" onClick={nextPage} disabled={indexOfLastProduct >= filteredProducts.length}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
