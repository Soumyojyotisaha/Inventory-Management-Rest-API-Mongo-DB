import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import CustomerSignup from "./pages/CustomerSignup";
import SupplierSignup from "./pages/SupplierSignup";
import CustomerLogin from "./pages/CustomerLogin";
import SupplierLogin from "./pages/SupplierLogin";
import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  return (
    <div 
      style={{
        backgroundImage: "url('/pixelcut-export.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/customer-signup" element={<CustomerSignup />} />
          <Route path="/supplier-signup" element={<SupplierSignup />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/supplier-login" element={<SupplierLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
