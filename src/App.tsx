import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Auth/SignIn/SignIn";
import RegisterStep1 from "./pages/Auth/RegisterStep1/RegisterStep1";
import RegisterStep2 from "./pages/Auth/RegisterStep2/RegisterStep2";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import "./styles/main.scss";
import ConsumerProfile from "./pages/Profiles/ConsumerProfile/ConsumerProfile";
import AgentProfile from "./pages/Profiles/AgentProfile/AgentProfile";
import AgencyProfile from "./pages/Profiles/AgencyProfile/AgencyProfile";
import ToolsProfile from "./pages/Profiles/ToolsProfile/ToolsProfile";
import ServiceProfile from "./pages/Profiles/ServiceProfile/ServiceProfile";
import ToolsForAgents from "./pages/ToolsForAgents/ToolsForAgents";
import FindRealEstateService from "./pages/FindRealEstateService/FindRealEstateService";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<div>Buy Page - Coming Soon</div>} />
        <Route path="/sell" element={<div>Sell Page - Coming Soon</div>} />
        <Route path="/lease" element={<div>Lease Page - Coming Soon</div>} />
        <Route path="/tools-for-agents" element={<ToolsForAgents />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<RegisterStep1 />} />
        <Route path="/register/step-2" element={<RegisterStep2 />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/consumer/profile" element={<ConsumerProfile />} />
        <Route path="/agent/profile" element={<AgentProfile />} />
        <Route path="/agency/profile" element={<AgencyProfile />} />
        <Route path="/tools/profile" element={<ToolsProfile />} />
        <Route path="/service/profile" element={<ServiceProfile />} />
        <Route
          path="/find-agent"
          element={<div>Find Agent Page - Coming Soon</div>}
        />
        <Route path="/find-services" element={<FindRealEstateService />} />
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
