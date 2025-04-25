import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Landing Page
import Landing from "./assets/Landing";

// Customer Pages
import CustomerSignup from "./pages/Customer_Pages/CustomerSignup";
import CustomerLogin from "./pages/Customer_Pages/CustomerLogin";
import CustomerDashboard from "./pages/Customer_Pages/CustomerDashboard";
import ViewOrders from "./pages/Customer_Pages/ViewOrders";
import PlaceOrder from "./pages/Customer_Pages/PlaceOrder";
import CancelOrder from "./pages/Customer_Pages/CancelOrder";
import DeleteProfile from "./pages/Customer_Pages/DeleteProfile";
import UpdateCustomer from "./pages/Customer_Pages/UpdateCustomer";
import ForgotPassword from "./pages/Customer_Pages/ForgotPassword";

// Supplier Pages
import SupplierSignup from "./pages/Supplier_Pages/SupplierSignup";
import SupplierLogin from "./pages/Supplier_Pages/SupplierLogin";
import SupplierDashboard from "./pages/Supplier_Pages/SupplierDashboard";
import GetAllOrders from "./pages/Supplier_Pages/GetAllOrders";
import UpdateOrderStatus from "./pages/Supplier_Pages/UpdateOrderStatus";
import ViewCustomerBase from "./pages/Supplier_Pages/ViewCustomerBase";
import Toggle2FA from "./pages/Supplier_Pages/Toggle2FA";
import ForgotSupplierPassword from "./pages/Supplier_Pages/ForgotSupplierPassword";
import DeleteProductFromStock from "./pages/Supplier_Pages/DeleteProductFromStock";
import UpdateStock from "./pages/Supplier_Pages/UpdateStock";
import UpdateProduct from "./pages/Supplier_Pages/UpdateProduct";
import AddProduct from "./pages/Supplier_Pages/AddProduct";
import VerifyOTP2fa from "./pages/Supplier_Pages/VerifyOTP2fa";

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/pixelcut-export.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <Router>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Landing />} />

          {/* Customer Routes */}
          <Route path="/customer-signup" element={<CustomerSignup />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/cancel-order" element={<CancelOrder />} />
          <Route path="/delete-profile" element={<DeleteProfile />} />
          <Route path="/update-customer" element={<UpdateCustomer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Supplier Routes */}
          <Route path="/supplier-signup" element={<SupplierSignup />} />
          <Route path="/supplier-login" element={<SupplierLogin />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/get-all-order-details" element={<GetAllOrders />} />
          <Route path="/update-order-status" element={<UpdateOrderStatus />} />
          <Route path="/view-customer-base" element={<ViewCustomerBase />} />
          <Route path="/toggle-2fa" element={<Toggle2FA />} />
          <Route path="/forgot-supplier-password" element={<ForgotSupplierPassword />} />
          <Route path="/delete-product-from-stock" element={<DeleteProductFromStock />} />
          <Route path="/update-stock" element={<UpdateStock />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/verify-otp" element={<VerifyOTP2fa />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;