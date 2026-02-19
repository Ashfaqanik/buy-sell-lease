import { useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import "./HeroSearch.scss";
import FilterModal from "../FilterModal/FilterModal";
import { useNavigate } from "react-router-dom";

type SearchTab = "buy" | "rent" | "sold" | "services";

const tabs: { id: SearchTab; label: string }[] = [
  { id: "buy", label: "BUY" },
  { id: "rent", label: "LEASE" },
  { id: "sold", label: "SOLD/LEASED" },
  { id: "services", label: "YOUR REAL ESTATE SERVICES" },
];

const tabDropdowns: Record<SearchTab, string[]> = {
  buy: ["Residential", "Commercial"],
  rent: ["Residential Rentals", "Commercial Leasing"],
  sold: ["Sold", "Leased"],
  services: [
    "Conveyancer",
    "Mortgage Broker",
    "Valuer",
    "Landlord and Property Insurance",
    "Buyers Agents",
    "Building Inspector",
    "Surveyors/Depreciation Reports",
    "Removalists and Storage",
    "Pest and Building Inspectors",
    "Gardening and Landscape",
    "Rubbish removal and Skip Bins",
    "Painters",
    "Locksmiths",
    "Utility Connection and Supply",
  ],
};

const HeroSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("buy");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "services") {
      navigate(`/search/services?query=${encodeURIComponent(searchQuery)}`);
      return;
    }

    const searchType =
      activeTab === "rent" ? "lease" : activeTab === "sold" ? "sold" : "buy";

    navigate(
      `/search/properties?location=${encodeURIComponent(
        searchQuery || "",
      )}&searchType=${searchType}&category=residential`,
    );
  };

  return (
    <>
      <section className="hero-search">
        <div className="hero-search__overlay">
          <div className="hero-search__container">
            {/* Heading */}
            <h1 className="hero-search__heading">
              "Everything real estate, under one roof!"
            </h1>

            {/* Tabs */}
            <div className="hero-search__tabs">
              {tabs.map((tab) => (
                <div key={tab.id} className="hero-search__tab-wrapper">
                  <button
                    type="button"
                    className={`hero-search__tab ${activeTab === tab.id ? "hero-search__tab--active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>

                  {/* Dropdown */}
                  <div className="hero-search__dropdown">
                    {tabDropdowns[tab.id].map((item) => (
                      <div
                        key={item}
                        className="hero-search__dropdown-item"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setSearchQuery(item);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="hero-search__search-box">
              {/* Desktop */}
              <div className="hero-search__input-wrapper desktop-only">
                <FaSearch size={18} className="hero-search__search-icon" />

                <input
                  type="text"
                  className="hero-search__input"
                  placeholder="Search suburb, postcode or state"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="hero-search__filters-btn"
                >
                  <FaSlidersH />
                  <span>Filters</span>
                </button>

                <button type="submit" className="hero-search__search-btn">
                  Search
                </button>
              </div>

              {/* Mobile */}
              <div className="hero-search__mobile-stack mobile-only">
                <div className="hero-search__input-row">
                  <FaSearch size={18} className="hero-search__search-icon" />
                  <input
                    type="text"
                    className="hero-search__input"
                    placeholder="Search suburb, postcode or state"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="hero-search__filters-btn-mobile"
                >
                  <FaSlidersH />
                  <span>Filters</span>
                </button>

                <button
                  type="submit"
                  className="hero-search__search-btn-mobile"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
};

export default HeroSearch;
