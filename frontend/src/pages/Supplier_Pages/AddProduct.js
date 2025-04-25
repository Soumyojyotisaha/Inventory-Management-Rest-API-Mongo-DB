import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SupplierSideNavbar from "./SupplierSideNavbar";
import Background from "../Background";


function AddProduct() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();


  const handleAddProduct = () => {
    const token = localStorage.getItem("supplier-jwtToken");


    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to add products.");
      navigate("/supplier-login"); // Redirect to login page
      return;
    }


    const newProduct = {
      name,
      type,
      quantity,
      price,
    };


    axios.post("https://inventory-management-rest-api-mongo-db.onrender.com/api/products", newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log("Product added response:", response.data);
      alert("Product added successfully!");
      navigate("/update-stock"); // Redirect to products page
    })
    .catch(error => {
      console.error("Error adding product:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      alert(`Failed to add product. Error: ${errorMessage}`);
    });
  };


  return (
    <div className="d-flex">
      <Background />
      <SupplierSideNavbar />


      <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ marginLeft: "270px", width: "100%", maxWidth: "90%", backdropFilter: "blur(5px)" }}>
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h1 className="mb-4 fw-bold text-center" style={{ fontSize: "2.5rem", color: "rgb(51, 51, 51)" }}>
            Add Product
          </h1>


          <div className="mb-3">
            <label>Product Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div className="mb-3">
            <label>Product Type:</label>
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="phone">Phone</option>
              <option value="tablet">Tablet</option>
              <option value="laptop">Laptop</option>
              <option value="accessory">Accessory</option>
            </select>
          </div>


          <div className="mb-3">
            <label>Quantity:</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>


          <div className="mb-3">
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>


          <button className="btn btn-primary" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}


export default AddProduct;





