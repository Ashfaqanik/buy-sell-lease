import { useEffect, useMemo, useRef, useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./HeroSearch.scss";
import FilterModal from "../FilterModal/FilterModal";

type SearchTab = "buy" | "rent" | "sold" | "services";
type PropertyCategory = "residential" | "commercial";

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

//No defaults: nothing selected initially
const DEFAULT_SELECTED: Record<SearchTab, string> = {
  buy: "",
  rent: "",
  sold: "",
  services: "",
};

function deriveCategoryFromBuySelection(
  selection: string,
): PropertyCategory | "" {
  if (selection === "Residential") return "residential";
  if (selection === "Commercial") return "commercial";
  return "";
}

function deriveSearchType(tab: SearchTab) {
  if (tab === "rent") return "lease";
  if (tab === "sold") return "sold";
  return "buy";
}

const HeroSearch = () => {
  const navigate = useNavigate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Location input ONLY
  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<SearchTab>("buy");

  // Dropdown opens only on click
  const [openDropdownTab, setOpenDropdownTab] = useState<SearchTab | null>(
    null,
  );

  // One state object for selections
  const [selected, setSelected] =
    useState<Record<SearchTab, string>>(DEFAULT_SELECTED);

  // Derived category from BUY selection (empty until chosen)
  const category = useMemo(
    () => deriveCategoryFromBuySelection(selected.buy),
    [selected.buy],
  );

  const tabsRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!tabsRef.current) return;
      if (!tabsRef.current.contains(e.target as Node)) {
        setOpenDropdownTab(null);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const handleTabClick = (tabId: SearchTab) => {
    setActiveTab(tabId);
    setOpenDropdownTab((prev) => (prev === tabId ? null : tabId));
  };

  const handleDropdownItemClick = (tabId: SearchTab, item: string) => {
    setActiveTab(tabId);
    setOpenDropdownTab(null);

    setSelected({
      buy: "",
      rent: "",
      sold: "",
      services: "",
      [tabId]: item,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Services search
    if (activeTab === "services") {
      const qs = new URLSearchParams();
      qs.set("query", searchQuery || "");
      if (selected.services) qs.set("serviceType", selected.services);

      navigate(`/search/services?${qs.toString()}`);
      return;
    }

    // Properties search
    const searchType = deriveSearchType(activeTab);
    const qs = new URLSearchParams();
    qs.set("location", searchQuery || "");
    qs.set("searchType", searchType);

    // Only include category if user selected Residential/Commercial
    if (category) qs.set("category", category);

    // Optional: include tab selection as params (for later backend)
    if (activeTab === "rent" && selected.rent)
      qs.set("rentType", selected.rent);
    if (activeTab === "sold" && selected.sold) qs.set("status", selected.sold);

    navigate(`/search/properties?${qs.toString()}`);
  };

  const renderTabLabel = (tabId: SearchTab, label: string) => {
    const chosen = selected[tabId];
    return (
      <>
        {label}
        {chosen ? (
          <span className="hero-search__tab-meta">({chosen})</span>
        ) : null}
      </>
    );
  };

  return (
    <>
      <section className="hero-search">
        <div className="hero-search__overlay">
          <div className="hero-search__container">
            <h1 className="hero-search__heading">
              "Everything real estate, under one roof!"
            </h1>

            {/* Tabs */}
            <div className="hero-search__tabs" ref={tabsRef}>
              {tabs.map((tab) => (
                <div key={tab.id} className="hero-search__tab-wrapper">
                  <button
                    type="button"
                    className={`hero-search__tab ${
                      activeTab === tab.id ? "hero-search__tab--active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {renderTabLabel(tab.id, tab.label)}
                  </button>

                  {/* Dropdown (open only when clicked) */}
                  <div
                    className={`hero-search__dropdown ${
                      openDropdownTab === tab.id
                        ? "hero-search__dropdown--open"
                        : ""
                    }`}
                  >
                    {tabDropdowns[tab.id].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`hero-search__dropdown-item ${
                          selected[tab.id] === item
                            ? "hero-search__dropdown-item--active"
                            : ""
                        }`}
                        onClick={() => handleDropdownItemClick(tab.id, item)}
                      >
                        {item}
                      </button>
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
