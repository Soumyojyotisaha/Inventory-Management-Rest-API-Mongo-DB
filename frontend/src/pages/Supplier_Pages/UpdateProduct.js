import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierSideNavbar from "./SupplierSideNavbar";
import Background from "../Background";

function UpdateProduct() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [nameToUpdate, setNameToUpdate] = useState({});
  const [priceToUpdate, setPriceToUpdate] = useState({});
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to view and update products.");
      navigate("/supplier-login"); // Redirect to login page
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

  const handleUpdateProduct = (productId) => {
    const token = localStorage.getItem("supplier-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to update products.");
      return;
    }

    const name = nameToUpdate[productId] || "";
    const price = priceToUpdate[productId] || 0;

    // Validation: Ensure price is greater than 0
    if (price <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    console.log(`Updating product ID: ${productId} with name: ${name} and price: ${price}`);

    axios
      .put(
        `https://inventory-management-rest-api-mongo-db.onrender.com/api/products/${productId}`,
        { name, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Product update response:", response.data);
        setProducts(
          products.map((product) =>
            product._id === productId ? { ...product, name, price } : product
          )
        );
        alert("Product updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;
        alert(`Failed to update product. Error: ${errorMessage}`);
      });
  };

  return (
    <div className="d-flex">
      <Background />
      <SupplierSideNavbar />

      <div
        className="container mt-4"
        style={{ marginLeft: "270px", width: "80%", backdropFilter: "blur(5px)" }}
      >
        <h1
          className="mb-4 fw-bold text-center"
          style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}
        >
          Update Product
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
                <div
                  className="card p-3"
                  style={{
                    backgroundColor: "#f8f9fa",
                    boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)",
                    borderRadius: "10px",
                  }}
                >
                  <h4 className="fw-bold">Product Name: {product.name}</h4>
                  <p>Product Description: {product.description}</p>
                  <p className="fw-bold text-primary">Price: ${product.price}</p>
                  <div className="mb-3">
                    <label>Update Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nameToUpdate[product._id] || ""}
                      onChange={(e) =>
                        setNameToUpdate({ ...nameToUpdate, [product._id]: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Update Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={priceToUpdate[product._id] || ""}
                      onChange={(e) =>
                        setPriceToUpdate({
                          ...priceToUpdate,
                          [product._id]: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdateProduct(product._id)}
                  >
                    Update Product
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-sm btn-primary mx-5"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            &larr;
          </button>
          <span
            className="fw-bold px-3 py-2"
            style={{
              backgroundColor: "rgb(0, 123, 255)",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Page {currentPage}
          </span>
          <button
            className="btn btn-sm btn-primary mx-5"
            onClick={nextPage}
            disabled={indexOfLastProduct >= filteredProducts.length}
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;