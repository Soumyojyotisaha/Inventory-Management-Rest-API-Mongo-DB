import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNavbar from "./CustomerSideNavbar";
import Background from "../Background";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function PlaceOrder() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderMessage, setOrderMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Adjust the range as needed
  const productsPerPage = 9;

  useEffect(() => {
    // Fetch available products
    axios.get("https://inventory-management-rest-api-mongo-db.onrender.com/api/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectProduct = (product) => {
    if (quantity <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    const existingProduct = selectedProducts.find(p => p.product === product._id);
    if (existingProduct) {
      setSelectedProducts(selectedProducts.map(p =>
        p.product === product._id ? { ...p, quantity: p.quantity + quantity } : p
      ));
    } else {
      setSelectedProducts([...selectedProducts, { product: product._id, name: product.name, price: product.price, quantity }]);
    }
    setPopupMessage(`${product.name} added to cart`);
    setTimeout(() => setPopupMessage(""), 3000); // Hide popup after 3 seconds
  };

  const handlePlaceOrder = () => {
    const token = localStorage.getItem("customer-jwtToken");

    if (!token) {
      console.error("No token found in localStorage");
      alert("You need to log in to place an order.");
      window.location.href = "/customer-login";
      return;
    }

    if (selectedProducts.length === 0) {
      alert("Please add at least one product to your cart before placing an order.");
      return;
    }

    const invalidProduct = selectedProducts.find(product => product.quantity <= 0);
    if (invalidProduct) {
      alert(`Invalid quantity for product: ${invalidProduct.name}. Quantity must be greater than 0.`);
      return;
    }

    axios.post("https://inventory-management-rest-api-mongo-db.onrender.com/api/orders", { products: selectedProducts }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const totalBill = selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
      const orderDetails = selectedProducts.map(product => `Product Name: ${product.name}, Quantity: ${product.quantity}`).join("\n");
      setOrderMessage(`Order placed successfully!\n\n${orderDetails}\n\nTotal Bill: $${totalBill}`);
      setSelectedProducts([]);
    })
    .catch(error => {
      console.error("Error placing order:", error);
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
      alert(`Failed to place order. Error: ${errorMessage}`);
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1]
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

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("customer-jwtToken");

      if (!token) {
        console.error("No token found, redirecting to login page.");
        alert("You need to log in to log out.");
        window.location.href = "/customer-login";
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
      window.location.href = "/customer-login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="d-flex">
      <Background />
      <SideNavbar handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="container d-flex flex-column align-items-center" style={{ marginLeft: "270px", width: "80%", backdropFilter: "blur(5px)" }}>
        {popupMessage && (
          <div className="alert alert-info position-fixed top-0 mt-3" style={{ zIndex: 1000 }}>
            {popupMessage}
          </div>
        )}
        <h1 className="mb-4 fw-bold">Place Order</h1>
        <div className="mb-3 w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="mb-3 w-50">
          <label>Quantity:</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
          />
        </div>
        <div className="mb-3 w-50">
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
        <div className="row w-100">
          {currentProducts.map(product => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card p-3" style={{ boxShadow: "0px 4px 8px rgba(28, 139, 230, 0.7)", borderRadius: "10px", height: "100%" }}>
                <h4 className="fw-bold">{product.name}</h4>
                <p>{product.description}</p>
                <p className="fw-bold text-primary">${product.price}</p>
                <button className="btn btn-primary btn-sm" onClick={() => handleSelectProduct(product)} style={{ transition: "transform 0.1s" }} onMouseDown={(e) => e.target.style.transform = "scale(0.95)"} onMouseUp={(e) => e.target.style.transform = "scale(1)"}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3 w-50">
          <button className="btn btn-sm btn-primary mx-2" onClick={prevPage} disabled={currentPage === 1}>
            &larr;
          </button>
          <span className="fw-bold px-3 py-2" style={{ backgroundColor: "rgb(0, 123, 255)", color: "white", borderRadius: "5px" }}>
            Page {currentPage}
          </span>
          <button className="btn btn-sm btn-primary mx-2" onClick={nextPage} disabled={indexOfLastProduct >= filteredProducts.length}>
            &rarr;
          </button>
        </div>
        <button className="btn btn-success w-50 mt-3 fw-bold" onClick={handlePlaceOrder}>
          Place Order
        </button>
        {orderMessage && (
          <div className="alert alert-success mt-3 w-50">
            {orderMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaceOrder;