import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierSideNavbar from "./SupplierSideNavbar";
import Background from "../Background";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function UpdateStock() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Adjust the range as needed
  const [stockRange, setStockRange] = useState([0, 100]); // Adjust the range as needed
  const [quantityToAdd, setQuantityToAdd] = useState({});
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to view and update stock.");
      navigate("/supplier-login"); // Redirect to login page
      return;
    }

    axios.get("https://inventory-management-rest-api-mongo-db.onrender.com/api/products", {
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
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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

  const handleAddStock = (productId) => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to update stock.");
      return;
    }

    const quantity = quantityToAdd[productId] || 0;

    // Validation: Ensure quantity is greater than 0
    if (quantity <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    console.log(`Updating stock for product ID: ${productId} with quantity: ${quantity}`);

    axios.patch(`https://inventory-management-rest-api-mongo-db.onrender.com/api/products/${productId}/add-stock`, { quantity }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Stock update response:", response.data);
        setProducts(products.map((product) =>
          product._id === productId ? { ...product, quantity: product.quantity + quantity } : product
        ));
        alert("Stock updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating stock:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
        alert(`Failed to update stock. Error: ${errorMessage}`);
      });
  };

  return (
    <div className="d-flex">
      <Background />
      <SupplierSideNavbar />

      <div className="container mt-4" style={{ marginLeft: "270px", width: "80%", backdropFilter: "blur(5px)" }}>
        <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
          Update Stock
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
                <div className="card p-3" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px" }}>
                  <h4 className="fw-bold">Product Name: {product.name}</h4>
                  <p>Product Description: {product.description}</p>
                  <p className="fw-bold text-primary">Price: ${product.price}</p>
                  <p style={{ color: product.quantity > 20 ? "green" : "red" }}>
                    Stock: {product.quantity}
                  </p>
                  <div className="mb-3">
                    <label>Add Quantity to Stock:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={quantityToAdd[product._id] || ""}
                      onChange={(e) => setQuantityToAdd({ ...quantityToAdd, [product._id]: parseInt(e.target.value) })}
                    />
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => handleAddStock(product._id)}>
                    Add to Stock
                  </button>
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

export default UpdateStock;