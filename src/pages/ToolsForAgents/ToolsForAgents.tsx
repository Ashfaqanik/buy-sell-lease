import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./ToolsForAgents.scss";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const serviceCategories = [
  "Auctioneers",
  "Photographers",
  "Videographers",
  "Floorplans",
  "Window Display",
  "Printing and Stationery",
  "Signboards and signage",
  "Corporate Merchandise",
  "Giftware",
  "Software",
  "Real Estate Training",
];

const ToolsForAgents = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="tools-for-agents">
      <Navbar />
      {/* Hero Section */}
      <section className="tools-for-agents__hero">
        <h1>Buy Sell Lease is "Everything real estate – under one roof!"™</h1>
        <p>
          With Buy Sell Lease, we not only market your agents, your agency and
          all of your properties for sale and lease, we also assist you in
          helping you find the tools you need in your day to day business
          activities.
        </p>
        <p>
          An easy reference source of local products and services to assist you
          in your real estate activities.
        </p>
      </section>

      {/* Services Section */}
      <section className="tools-for-agents__services">
        <h2>These services include:</h2>

        <div className="tools-for-agents__categories">
          {serviceCategories.map((category) => (
            <div
              key={category}
              className={`tools-for-agents__category ${selectedCategory === category ? "active" : ""}`}
              onClick={() =>
                setSelectedCategory(
                  category === selectedCategory ? null : category,
                )
              }
            >
              <span className="tools-for-agents__checkbox-icon">☐</span>
              <span className="tools-for-agents__category-name">
                {category}
              </span>
            </div>
          ))}
        </div>

        <p className="tools-for-agents__amongst">amongst other things</p>
      </section>

      {/* Info Section */}
      <section className="tools-for-agents__info">
        <p>
          At BuySellLease.com.au, we want to be a valuable tool and source of
          information for your business. A portal that markets your properties
          and your agency as well as helping you find the services that you
          need.
        </p>
        <p>
          To find the services that you need, login to your profile, at "MyBSL"
          select "Tools for Agents" and begin your search. You can save your
          searches in your profile setting.
        </p>
      </section>

      {/* Search Section */}
      <section className="tools-for-agents__search-section">
        <div className="tools-for-agents__search-box">
          <div className="tools-for-agents__search-input">
            <FaSearch />
            <input
              type="text"
              placeholder="Search for tools and services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="tools-for-agents__search-btn">Search</button>
        </div>
      </section>

      {/* Footer Tagline */}
      <div className="tools-for-agents__footer">
        <p>Buy Sell Lease - "Everything real estate – under one roof!"™</p>
      </div>
      <Footer />
    </div>
  );
};

export default ToolsForAgents;
