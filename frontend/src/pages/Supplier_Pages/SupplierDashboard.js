import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../Supplier_Pages/SupplierSideNavbar";
import Background from "../Background";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function SupplierDashboard() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Adjust the range as needed
  const [stockRange, setStockRange] = useState([0, 100]); // Adjust the range as needed
  const productsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found, redirecting to supplier login page.");
      alert("You need to log in to access the dashboard.");
      navigate("/supplier-login"); // Redirect to supplier login page
      return;
    }

    axios
      .get("https://inventory-management-rest-api-mongo-db.onrender.com/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [navigate]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1] &&
    product.quantity >= stockRange[0] &&
    product.quantity <= stockRange[1]
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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("supplier-jwtToken");

      if (!token) {
        console.error("No token found, redirecting to login page.");
        alert("No token found, redirecting to login page.");
        navigate("/supplier-login");
        return;
      }

      await axios.post(
        "https://inventory-management-rest-api-mongo-db.onrender.com/api/suppliers/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("supplier-jwtToken");
      alert("You have been logged out successfully!");
      navigate("/supplier-login"); // Redirect to supplier login page
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="d-flex">
      <Background />
      <SideNavbar handleLogout={handleLogout} />

      <div className="container mt-4" style={{ marginLeft: "270px", width: "80%", backdropFilter: "blur(5px)" }}>
        <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)", background: "white", padding: "15px" }}>
          Welcome to <span style={{ color: "rgb(0, 123, 255)" }}>Inventory Hub</span>
        </h1>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Filter by Price:</label>
          <Slider
            range
            min={0}
            max={1000}
            defaultValue={[0, 1000]}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
          />
          <div className="d-flex justify-content-between">
            <span style={{ backgroundColor: "white", padding: "2px 5px" }}>${priceRange[0]}</span>
            <span style={{ backgroundColor: "white", padding: "2px 5px" }}>${priceRange[1]}</span>
          </div>
        </div>

        <div className="mb-3">
          <label>Filter by Stock:</label>
          <Slider
            range
            min={0}
            max={100}
            defaultValue={[0, 100]}
            value={stockRange}
            onChange={(value) => setStockRange(value)}
          />
          <div className="d-flex justify-content-between">
            <span style={{ backgroundColor: "white", padding: "2px 5px" }}>{stockRange[0]}</span>
            <span style={{ backgroundColor: "white", padding: "2px 5px" }}>{stockRange[1]}</span>
          </div>
        </div>

        <div className="row">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card p-3" style={{ boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px", height: "100%" }}>
                  <h4 className="fw-bold">{product.name}</h4>
                  <p>{product.description}</p>
                  <p className="fw-bold text-primary">${product.price}</p>
                  <p style={{ color: product.quantity < 10 ? "red" : "green" }}>
                    Stock: {product.quantity}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-sm btn-primary mx-5" onClick={prevPage} disabled={currentPage === 1}>
            &larr;
          </button>
          <span className="fw-bold px-3 py-2" style={{ backgroundColor: "rgb(0, 123, 255)", color: "white", borderRadius: "5px" }}>
            Page {currentPage}
          </span>
          <button className="btn btn-sm btn-primary mx-5" onClick={nextPage} disabled={indexOfLastProduct >= filteredProducts.length}>
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupplierDashboard;