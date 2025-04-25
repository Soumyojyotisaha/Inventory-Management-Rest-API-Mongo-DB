import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierSideNavbar from "./SupplierSideNavbar";
import Background from "../Background";

function DeleteProductFromStock() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to view your products.");
      navigate("/supplier-login"); // Redirect to login page
      return;
    }

    axios.get("https://inventory-management-rest-api-mongo-db.onrender.com/api/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Products fetched:", response.data); // Log the response data
      setProducts(response.data); // Update to correctly handle the API response
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
  }, [navigate]);

  const handleDeleteProduct = (productId) => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to delete a product.");
      return;
    }

    axios.delete(`https://inventory-management-rest-api-mongo-db.onrender.com/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setDeleteMessage(`Product deleted successfully!`);
      setProducts(products.filter(product => product._id !== productId));
      setPopupMessage(`Product ID: ${productId} deleted successfully!`);
      setTimeout(() => setPopupMessage(""), 3000); // Hide popup after 3 seconds
    })
    .catch(error => {
      console.error("Error deleting product:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      alert(`Failed to delete product. Error: ${errorMessage}`);
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="d-flex">
      <Background />
      <SupplierSideNavbar />

      {/* Main Content */}
      <div className="container mt-4" style={{ marginLeft: "270px", width: "80%", backdropFilter: "blur(5px)" }}>
        {popupMessage && (
          <div className="alert alert-info position-fixed top-0 mt-3" style={{ zIndex: 1000 }}>
            {popupMessage}
          </div>
        )}
        <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
          Delete Products
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

        <div className="row">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card p-3" style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px" }}>
                  <h4 className="fw-bold">Product ID: {product._id}</h4>
                  <p><strong>Product Name:</strong> {product.name}</p>
                  <p><strong>Product Price:</strong> ${product.price}</p>
                  <p><strong>Quantity:</strong> {product.quantity}</p>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product._id)}>
                    Delete Product
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

        {deleteMessage && (
          <div className="alert alert-success mt-3 w-50">
            {deleteMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteProductFromStock;