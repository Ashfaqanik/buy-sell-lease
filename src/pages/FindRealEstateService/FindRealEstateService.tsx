import { useState } from "react";
import "./FindRealEstateService.scss";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const servicesList = [
  "Conveyancing",
  "Finance",
  "Valuation",
  "Property and Landlord Insurance",
  "Survey and Depreciation Report",
  "Buyer's Agent",
  "Removalist's and Storage",
  "Pest and Building Inspections",
  "Locksmiths",
  "Cleaning & Carpet Cleaning",
  "Painters",
  "Landscaping and Gardening",
  "Rubbish Removal and Skip Bins",
  "Utility Connections",
];

const FindRealEstateService = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="find-real-estate-service">
      <Navbar />

      {/* Main Content Section */}
      <section className="find-real-estate-service__content">
        <div className="find-real-estate-service__header">
          <p className="find-real-estate-service__subtitle">Find all your</p>
          <h1 className="find-real-estate-service__title">
            Local real estate services
          </h1>
          <p className="find-real-estate-service__subtitle">to help you</p>
          <p className="find-real-estate-service__action">
            Buy, Sell or Lease !
          </p>

          <button className="find-real-estate-service__cta-btn">
            Click here
          </button>
        </div>

        {/* Tagline */}
        <p className="find-real-estate-service__tagline">
          "Everything real estate, under one roof!"{" "}
          <span className="find-real-estate-service__trademark">™</span>
        </p>

        {/* Logo Section */}
        <div className="find-real-estate-service__logo-box">
          <img src="/bsl_logo.png" alt="Buy Sell Lease Logo" width={300} />
        </div>

        {/* Services List Section */}
        <section className="find-real-estate-service__services">
          <div className="find-real-estate-service__services-list">
            {servicesList.map((service) => (
              <div
                key={service}
                className={`find-real-estate-service__service-item ${selectedService === service ? "active" : ""}`}
                onClick={() =>
                  setSelectedService(
                    service === selectedService ? null : service,
                  )
                }
              >
                <span className="find-real-estate-service__checkbox-icon">
                  ☐
                </span>
                <span className="find-real-estate-service__service-name">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
};

export default FindRealEstateService;
