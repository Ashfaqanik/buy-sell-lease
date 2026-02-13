import { useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import "./HeroSearch.scss";
import FilterModal from "../FilterModal/FilterModal";

type SearchTab = "buy" | "rent" | "sold" | "services";

const tabs: { id: SearchTab; label: string }[] = [
  { id: "buy", label: "BUY" },
  { id: "rent", label: "LEASE" },
  { id: "sold", label: "SOLD" },
  { id: "services", label: "YOUR REAL ESTATE SERVICES" },
];

const tabDropdowns: Record<SearchTab, string[]> = {
  buy: ["Residential", "Commercial", "Land", "Rural"],
  rent: ["Residential Rentals", "Commercial Leasing"],
  sold: ["Recent Sales", "Sales History"],
  services: ["Conveyancer", "Mortgage Broker", "Valuer", "Building Inspector"],
};

const HeroSearch = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState<SearchTab>("buy");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    //
    e.preventDefault();
    // console.log("Searching:", { type: activeTab, query: searchQuery });
  };

  return (
    <>
      <section className="hero-search">
        <div className="hero-search__overlay">
          <div className="hero-search__container">
            {/* Heading */}
            <h1 className="hero-search__heading">
              “Everything real estate, under one roof!”
            </h1>

            {/* Tabs */}
            <div className="hero-search__tabs">
              {tabs.map((tab) => (
                <div key={tab.id} className="hero-search__tab-wrapper">
                  <button className="hero-search__tab">{tab.label}</button>

                  {/* Dropdown */}
                  <div className="hero-search__dropdown">
                    {tabDropdowns[tab.id].map((item) => (
                      <div
                        key={item}
                        className="hero-search__dropdown-item"
                        onClick={() => setSearchQuery(item)}
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
              <div className="hero-search__input-wrapper">
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
