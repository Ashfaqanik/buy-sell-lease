import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/main.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<div>Buy Page - Coming Soon</div>} />
        <Route path="/sell" element={<div>Sell Page - Coming Soon</div>} />
        <Route path="/lease" element={<div>Lease Page - Coming Soon</div>} />
        <Route
          path="/find-agent"
          element={<div>Find Agent Page - Coming Soon</div>}
        />
        <Route
          path="/services"
          element={<div>Services Page - Coming Soon</div>}
        />
        <Route path="/tools" element={<div>Tools Page - Coming Soon</div>} />
        <Route
          path="/advertise"
          element={<div>Advertise Page - Coming Soon</div>}
        />
        <Route path="/jobs" element={<div>Jobs Page - Coming Soon</div>} />
        <Route path="/blog" element={<div>Blog Page - Coming Soon</div>} />
        <Route path="/about" element={<div>About Page - Coming Soon</div>} />
        <Route
          path="/mortgage-calculator"
          element={<div>Mortgage Calculator - Coming Soon</div>}
        />
        <Route
          path="/stamp-duty"
          element={<div>Stamp Duty Calculator - Coming Soon</div>}
        />
        <Route
          path="/contact"
          element={<div>Contact Page - Coming Soon</div>}
        />
        <Route path="/login" element={<div>Login Page - Coming Soon</div>} />
      </Routes>
    </div>
  );
}

export default App;
