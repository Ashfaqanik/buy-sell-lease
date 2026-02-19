import { useState, useEffect, useCallback, useRef } from "react";
import { FaTimes, FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FilterModal.scss";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "buy" | "lease" | "sold" | "leased";
}

type SearchType = "buy" | "lease" | "sold" | "leased";

interface Suburb {
  name: string;
  state: string;
  postcode: string;
}

interface PropertyType {
  name: string;
  count: string;
  subtypes?: string[];
}

const FilterModal = ({
  isOpen,
  onClose,
  initialTab = "buy",
}: FilterModalProps) => {
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState<SearchType>(initialTab);
  const [location, setLocation] = useState("");
  const [showSuburbDropdown, setShowSuburbDropdown] = useState(false);
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | null>(null);

  // Price state - committed values
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(46);
  const [isAbove15M, setIsAbove15M] = useState(false);

  // Temp state for editing in the dropdown
  const [tempPriceMin, setTempPriceMin] = useState(0);
  const [tempPriceMax, setTempPriceMax] = useState(46);
  const [tempIsAbove15M, setTempIsAbove15M] = useState(false);

  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  const [beds, setBeds] = useState("Any");
  const [propertyType, setPropertyType] = useState("All types");
  const [propertyCategory, setPropertyCategory] = useState<
    "residential" | "commercial"
  >("residential");
  const [includeNearby, setIncludeNearby] = useState(false);

  const [expandedSection, setExpandedSection] = useState<string | null>(
    "location",
  );

  const priceRulerRef = useRef<HTMLDivElement>(null);

  const priceScale = [
    "Any",
    "$50K",
    "$100K",
    "$150K",
    "$200K",
    "$250K",
    "$300K",
    "$350K",
    "$400K",
    "$450K",
    "$500K",
    "$550K",
    "$600K",
    "$650K",
    "$700K",
    "$750K",
    "$800K",
    "$850K",
    "$900K",
    "$950K",
    "$1M",
    "$1.1M",
    "$1.2M",
    "$1.3M",
    "$1.4M",
    "$1.5M",
    "$1.6M",
    "$1.7M",
    "$1.8M",
    "$1.9M",
    "$2M",
    "$2.2M",
    "$2.4M",
    "$2.6M",
    "$2.8M",
    "$3M",
    "$3.5M",
    "$4M",
    "$4.5M",
    "$5M",
    "$6M",
    "$7M",
    "$8M",
    "$9M",
    "$10M",
    "$12M",
    "$15M",
  ];

  const residentialTypes: PropertyType[] = [
    { name: "All types", count: "(No of)" },
    { name: "House", count: "(No of)" },
    { name: "Townhouse/Villa", count: "(No of)" },
    { name: "Apartment/Unit", count: "(No of)" },
    { name: "Retirement Living", count: "(No of)" },
    { name: "Land", count: "(No of)" },
    { name: "Acreage", count: "(No of)" },
    { name: "Rural", count: "(No of)" },
    { name: "Block of Units", count: "(No of)" },
  ];

  const commercialTypes: PropertyType[] = [
    { name: "All", count: "(No of)" },
    { name: "Offices", count: "(No of)" },
    { name: "Shop & Retail", count: "(No of)" },
    { name: "Factory, Warehouse & Industrial", count: "(No of)" },
    { name: "Land/Development Site", count: "(No of)" },
    { name: "Hotel, Motel, Pub & Leisure", count: "(No of)" },
    { name: "Block of Units", count: "(No of)" },
    { name: "Rural", count: "(No of)" },
  ];

  const mockSuburbs: Suburb[] = [
    { name: "Sydney", state: "NSW", postcode: "2000" },
    { name: "Melbourne", state: "VIC", postcode: "3000" },
    { name: "Brisbane", state: "QLD", postcode: "4000" },
    { name: "Perth", state: "WA", postcode: "6000" },
    { name: "Adelaide", state: "SA", postcode: "5000" },
    { name: "Gold Coast", state: "QLD", postcode: "4217" },
    { name: "Newcastle", state: "NSW", postcode: "2300" },
    { name: "Canberra", state: "ACT", postcode: "2600" },
  ];

  const filteredSuburbs = mockSuburbs.filter(
    (suburb) =>
      suburb.name.toLowerCase().includes(location.toLowerCase()) ||
      suburb.postcode.includes(location) ||
      suburb.state.toLowerCase().includes(location.toLowerCase()),
  );

  const searchTypes = [
    { value: "buy", label: "Buy" },
    { value: "lease", label: "Lease" },
    { value: "sold", label: "Sold" },
    { value: "leased", label: "Leased" },
  ];

  const bedOptions = ["Any", "Studio", "1", "2", "3", "4", "5+"];

  useEffect(() => {
    if (location.length > 0 && !selectedSuburb) {
      setShowSuburbDropdown(true);
    } else {
      setShowSuburbDropdown(false);
    }
  }, [location, selectedSuburb]);

  const handleSuburbSelect = (suburb: Suburb) => {
    setSelectedSuburb(suburb);
    setLocation(`${suburb.name}, ${suburb.state} ${suburb.postcode}`);
    setShowSuburbDropdown(false);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setSelectedSuburb(null);
  };

  const getPriceFromPosition = useCallback(
    (clientX: number) => {
      if (!priceRulerRef.current) return 0;
      const rect = priceRulerRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      const index = Math.round(percentage * (priceScale.length - 1));
      return index;
    },
    [priceScale.length],
  );

  const handleMouseDown = (handle: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(handle);
    setTempIsAbove15M(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const newIndex = getPriceFromPosition(e.clientX);

      if (isDragging === "min") {
        setTempPriceMin(Math.min(newIndex, tempPriceMax - 1));
      } else {
        setTempPriceMax(Math.max(newIndex, tempPriceMin + 1));
      }
      setTempIsAbove15M(false);
    },
    [isDragging, tempPriceMin, tempPriceMax, getPriceFromPosition],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handlePriceSectionOpen = () => {
    setTempPriceMin(priceMin);
    setTempPriceMax(priceMax);
    setTempIsAbove15M(isAbove15M);
    setExpandedSection("price");
  };

  const handleAbove15M = () => {
    setTempIsAbove15M(true);
    setTempPriceMin(priceScale.length - 1);
    setTempPriceMax(priceScale.length - 1);
  };

  const handlePriceApply = () => {
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setIsAbove15M(tempIsAbove15M);
    setExpandedSection(null);
  };

  const handlePriceCancel = () => {
    setTempPriceMin(priceMin);
    setTempPriceMax(priceMax);
    setTempIsAbove15M(isAbove15M);
    setExpandedSection(null);
  };

  const clearFilters = () => {
    setSearchType("buy");
    setLocation("");
    setSelectedSuburb(null);

    setPriceMin(0);
    setPriceMax(46);
    setTempPriceMin(0);
    setTempPriceMax(46);

    setIsAbove15M(false);
    setTempIsAbove15M(false);

    setBeds("Any");
    setPropertyType("All types");
    setPropertyCategory("residential");
    setIncludeNearby(false);
  };

  const toggleSection = (section: string) => {
    if (section === "price" && expandedSection !== "price") {
      handlePriceSectionOpen();
    } else {
      setExpandedSection(expandedSection === section ? null : section);
    }
  };

  const handlePropertySelect = (typeName: string, subtype?: string) => {
    setPropertyType(subtype ? subtype : typeName);
  };

  const handleSearch = () => {
    const locationValue = selectedSuburb
      ? `${selectedSuburb.name}, ${selectedSuburb.state} ${selectedSuburb.postcode}`
      : location;

    const minLabel = tempIsAbove15M ? "$15M+" : priceScale[priceMin];
    const maxLabel = tempIsAbove15M ? "$15M+" : priceScale[priceMax];

    const params = new URLSearchParams();

    if (locationValue) params.set("location", locationValue);
    params.set("searchType", searchType);
    params.set("category", propertyCategory);
    params.set("propertyType", propertyType);
    params.set("beds", beds);
    params.set("min", minLabel);
    params.set("max", maxLabel);
    params.set("nearby", includeNearby ? "1" : "0");

    navigate(`/search/properties?${params.toString()}`);
    onClose();
  };

  if (!isOpen) return null;

  const minPercent = (tempPriceMin / (priceScale.length - 1)) * 100;
  const maxPercent = (tempPriceMax / (priceScale.length - 1)) * 100;

  const currentTypes =
    propertyCategory === "residential" ? residentialTypes : commercialTypes;

  return (
    <div className="filter-modal__overlay" onClick={onClose}>
      <div
        className="filter-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="filter-modal__header">
          <h2>Filters</h2>
          <button className="filter-modal__close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="filter-modal__body">
          {/* Search Type */}
          <div className="filter-modal__section filter-modal__section--type">
            <div className="filter-modal__type-dropdown">
              <button
                className="filter-modal__type-btn"
                onClick={() =>
                  setExpandedSection(expandedSection === "type" ? null : "type")
                }
              >
                <span>
                  {searchTypes.find((t) => t.value === searchType)?.label}
                </span>
                <FaChevronDown
                  className={`filter-modal__type-chevron ${expandedSection === "type" ? "filter-modal__type-chevron--up" : ""}`}
                />
              </button>

              {expandedSection === "type" && (
                <div className="filter-modal__type-menu">
                  {searchTypes.map((type) => (
                    <button
                      key={type.value}
                      className={`filter-modal__type-option ${searchType === type.value ? "filter-modal__type-option--active" : ""}`}
                      onClick={() => {
                        setSearchType(type.value as SearchType);
                        setExpandedSection(null);
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="filter-modal__section">
            <label className="filter-modal__label">
              Suburb, State, Postcode
            </label>
            <div className="filter-modal__input-wrapper">
              <input
                type="text"
                placeholder="Enter suburb or postcode"
                value={location}
                onChange={handleLocationChange}
                className="filter-modal__input"
              />
              {location && (
                <button
                  className="filter-modal__clear-input"
                  onClick={() => {
                    setLocation("");
                    setSelectedSuburb(null);
                  }}
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {showSuburbDropdown && filteredSuburbs.length > 0 && (
              <div className="filter-modal__suburb-dropdown">
                {filteredSuburbs.map((suburb) => (
                  <button
                    key={`${suburb.name}-${suburb.postcode}`}
                    className="filter-modal__suburb-option"
                    onClick={() => handleSuburbSelect(suburb)}
                  >
                    <span className="filter-modal__suburb-name">
                      {suburb.name}
                    </span>
                    <span className="filter-modal__suburb-details">
                      {suburb.state} {suburb.postcode}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <label className="filter-modal__checkbox">
              <input
                type="checkbox"
                checked={includeNearby}
                onChange={(e) => setIncludeNearby(e.target.checked)}
              />
              Include neighbouring suburbs
            </label>
          </div>

          {/* Price */}
          <div className="filter-modal__section">
            <button
              className="filter-modal__section-header"
              onClick={() => toggleSection("price")}
            >
              <span>Price</span>
              <span className="filter-modal__section-value">
                {isAbove15M
                  ? "$15M+"
                  : `${priceScale[priceMin]} - ${priceScale[priceMax]}`}
              </span>
              <FaChevronDown
                className={`filter-modal__chevron ${expandedSection === "price" ? "filter-modal__chevron--up" : ""}`}
              />
            </button>

            {expandedSection === "price" && (
              <div className="filter-modal__section-content">
                <div className="filter-modal__price-scale" ref={priceRulerRef}>
                  <div className="filter-modal__price-track">
                    <div
                      className="filter-modal__price-range"
                      style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                      }}
                    />
                  </div>

                  <div
                    className={`filter-modal__price-handle filter-modal__price-handle--min ${isDragging === "min" ? "filter-modal__price-handle--dragging" : ""}`}
                    style={{ left: `${minPercent}%` }}
                    onMouseDown={handleMouseDown("min")}
                  >
                    <div className="filter-modal__price-tooltip">
                      {priceScale[tempPriceMin]}
                    </div>
                  </div>

                  <div
                    className={`filter-modal__price-handle filter-modal__price-handle--max ${isDragging === "max" ? "filter-modal__price-handle--dragging" : ""}`}
                    style={{ left: `${maxPercent}%` }}
                    onMouseDown={handleMouseDown("max")}
                  >
                    <div className="filter-modal__price-tooltip">
                      {priceScale[tempPriceMax]}
                    </div>
                  </div>
                </div>

                <div className="filter-modal__price-labels">
                  <span>Any</span>
                  <span>$5M</span>
                  <span>$10M</span>
                  <span>$15M</span>
                </div>

                <div className="filter-modal__price-above">
                  <button
                    className={`filter-modal__price-above-btn ${tempIsAbove15M ? "filter-modal__price-above-btn--active" : ""}`}
                    onClick={handleAbove15M}
                  >
                    $15M+
                  </button>
                  <span className="filter-modal__price-above-label">
                    For properties above $15 million
                  </span>
                </div>

                <div className="filter-modal__price-note">
                  Drag to set price range or select $15M+ for luxury properties.
                </div>

                <div className="filter-modal__price-actions">
                  <button
                    className="filter-modal__btn-cancel"
                    onClick={handlePriceCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="filter-modal__btn-apply"
                    onClick={handlePriceApply}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Beds */}
          <div className="filter-modal__section">
            <button
              className="filter-modal__section-header"
              onClick={() => toggleSection("beds")}
            >
              <span>Beds</span>
              <span className="filter-modal__section-value">
                {beds === "Any"
                  ? "Any"
                  : beds === "Studio"
                    ? "Studio"
                    : `${beds} beds`}
              </span>
              <FaChevronDown
                className={`filter-modal__chevron ${expandedSection === "beds" ? "filter-modal__chevron--up" : ""}`}
              />
            </button>

            {expandedSection === "beds" && (
              <div className="filter-modal__section-content">
                <div className="filter-modal__options-row">
                  {bedOptions.map((bed) => (
                    <button
                      key={bed}
                      className={`filter-modal__option-btn ${beds === bed ? "filter-modal__option-btn--active" : ""}`}
                      onClick={() => setBeds(bed)}
                    >
                      {bed === "Any"
                        ? "Any"
                        : bed === "Studio"
                          ? "Studio"
                          : `${bed}+`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Property Type */}
          <div className="filter-modal__section">
            <button
              className="filter-modal__section-header"
              onClick={() => toggleSection("property")}
            >
              <span>Property Type</span>
              <span className="filter-modal__section-value">
                {propertyType}
              </span>
              <FaChevronDown
                className={`filter-modal__chevron ${expandedSection === "property" ? "filter-modal__chevron--up" : ""}`}
              />
            </button>

            {expandedSection === "property" && (
              <div className="filter-modal__section-content">
                <div className="filter-modal__property-tabs">
                  <button
                    className={`filter-modal__property-tab ${propertyCategory === "residential" ? "filter-modal__property-tab--active" : ""}`}
                    onClick={() => {
                      setPropertyCategory("residential");
                      setPropertyType("All types");
                    }}
                  >
                    Residential
                  </button>
                  <button
                    className={`filter-modal__property-tab ${propertyCategory === "commercial" ? "filter-modal__property-tab--active" : ""}`}
                    onClick={() => {
                      setPropertyCategory("commercial");
                      setPropertyType("All");
                    }}
                  >
                    Commercial
                  </button>
                </div>

                <div className="filter-modal__property-tree">
                  {currentTypes.map((type) => (
                    <div
                      key={type.name}
                      className="filter-modal__property-item-wrapper"
                    >
                      <button
                        className={`filter-modal__property-item ${propertyType === type.name ? "filter-modal__property-item--active" : ""}`}
                        onClick={() => handlePropertySelect(type.name)}
                      >
                        <div className="filter-modal__property-main">
                          <span className="filter-modal__property-name">
                            {type.name}
                          </span>
                          <span className="filter-modal__property-count">
                            {type.count}
                          </span>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="filter-modal__footer">
          <button className="filter-modal__btn-clear" onClick={clearFilters}>
            Cancel
          </button>
          <button className="filter-modal__btn-search" onClick={handleSearch}>
            <FaSearch size={20} />
            Display Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
