import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./PropertiesSearch.scss";
import { mockProperties, type Property } from "./mockProperties";
import PageLayout from "../../../layouts/PageLayout";

type SortBy = "relevance" | "priceLow" | "priceHigh";

function parsePrice(priceLabel: string) {
  const n = Number(priceLabel.replace(/[^0-9]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

const clean = (v: string | null) => (v && v.trim().length ? v.trim() : "");

// Helper: only filter by a field if the mock property actually contains it
function hasField<T extends object>(obj: T, key: string): boolean {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
}

const PropertiesSearch = () => {
  const [searchParams] = useSearchParams();

  // Base params
  const location = clean(searchParams.get("location"));
  const searchType = clean(searchParams.get("searchType")) || "buy";

  const category = clean(searchParams.get("category")); // "residential" | "commercial" (optional)
  const rentType = clean(searchParams.get("rentType")); // optional
  const status = clean(searchParams.get("status")); // optional
  const serviceType = clean(searchParams.get("serviceType")); // optional

  const [sortBy, setSortBy] = useState<SortBy>("relevance");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [bedsMin, setBedsMin] = useState<number | "">("");

  const headerChips = useMemo(() => {
    const chips: { label: string; value: string }[] = [];

    if (location) chips.push({ label: "Location", value: location });
    if (searchType) chips.push({ label: "Search", value: searchType });

    if (category) chips.push({ label: "Category", value: category });
    if (rentType) chips.push({ label: "Rent Type", value: rentType });
    if (status) chips.push({ label: "Status", value: status });
    if (serviceType) chips.push({ label: "Service", value: serviceType });

    return chips;
  }, [location, searchType, category, rentType, status, serviceType]);

  const filteredResults = useMemo(() => {
    let list: Property[] = [...mockProperties];

    // simple location filter (placeholder)
    if (location) {
      const q = location.toLowerCase();
      list = list.filter((p) => {
        const suburbMatch = p.suburb?.toLowerCase().includes(q);
        const stateMatch = p.state?.toLowerCase().includes(q);
        return suburbMatch || stateMatch;
      });
    }

    if (category) {
      list = list.filter((p) => {
        const anyP = p as unknown as Record<string, unknown>;
        if (!hasField(anyP, "category")) return true;
        return String(anyP.category).toLowerCase() === category.toLowerCase();
      });
    }

    if (rentType) {
      list = list.filter((p) => {
        const anyP = p as unknown as Record<string, unknown>;
        if (!hasField(anyP, "rentType")) return true;
        return String(anyP.rentType).toLowerCase() === rentType.toLowerCase();
      });
    }

    if (status) {
      list = list.filter((p) => {
        const anyP = p as unknown as Record<string, unknown>;
        if (!hasField(anyP, "status")) return true;
        return String(anyP.status).toLowerCase() === status.toLowerCase();
      });
    }

    if (serviceType) {
      list = list.filter((p) => {
        const anyP = p as unknown as Record<string, unknown>;
        if (!hasField(anyP, "serviceType")) return true;
        return (
          String(anyP.serviceType).toLowerCase() === serviceType.toLowerCase()
        );
      });
    }

    // property type filter (UI)
    if (selectedTypes.length > 0) {
      list = list.filter((p) => selectedTypes.includes(p.type));
    }

    // beds filter (UI)
    if (bedsMin !== "") {
      list = list.filter((p) => p.beds >= bedsMin);
    }

    // sorting
    if (sortBy === "priceLow") {
      list.sort((a, b) => parsePrice(a.priceLabel) - parsePrice(b.priceLabel));
    }
    if (sortBy === "priceHigh") {
      list.sort((a, b) => parsePrice(b.priceLabel) - parsePrice(a.priceLabel));
    }

    return list;
  }, [
    location,
    category,
    rentType,
    status,
    serviceType,
    selectedTypes,
    bedsMin,
    sortBy,
  ]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const clearAll = () => {
    setSelectedTypes([]);
    setBedsMin("");
    setSortBy("relevance");
  };

  return (
    <PageLayout>
      <div className="properties-search">
        <div className="container">
          {/* Top Bar */}
          <div className="properties-search__top">
            <div>
              <h1 className="properties-search__title">Property Results</h1>

              {/*Show the URL selections in the header */}
              <div className="properties-search__chips">
                {headerChips.length === 0 ? (
                  <span className="chip chip--muted">No selections</span>
                ) : (
                  headerChips.map((c) => (
                    <span
                      key={`${c.label}-${c.value}`}
                      className="chip chip--info"
                    >
                      <strong>{c.label}:</strong> {c.value}
                    </span>
                  ))
                )}
              </div>

              <p className="properties-search__subtitle">
                {filteredResults.length} results
                {location ? ` for “${location}”` : ""}
              </p>
            </div>

            <div className="properties-search__sort">
              <label htmlFor="sort">Sort:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
              >
                <option value="relevance">Relevance</option>
                <option value="priceLow">Price (Low → High)</option>
                <option value="priceHigh">Price (High → Low)</option>
              </select>
            </div>
          </div>

          <div className="properties-search__layout">
            {/* Filters */}
            <aside className="properties-search__filters">
              <div className="properties-search__filters-header">
                <h2>Filters</h2>
                <button type="button" onClick={clearAll}>
                  Clear
                </button>
              </div>

              <div className="properties-search__filter-block">
                <h3>Property type</h3>
                <div className="properties-search__chips">
                  {["House", "Apartment", "Townhouse", "Land"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`chip ${
                        selectedTypes.includes(t) ? "chip--active" : ""
                      }`}
                      onClick={() => toggleType(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="properties-search__filter-block">
                <h3>Bedrooms</h3>
                <select
                  value={bedsMin === "" ? "" : String(bedsMin)}
                  onChange={(e) =>
                    setBedsMin(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </aside>

            {/* Results */}
            <section className="properties-search__results">
              {filteredResults.length === 0 ? (
                <div className="properties-search__empty">
                  <h3>No results found</h3>
                  <p>Try changing filters or search location.</p>
                </div>
              ) : (
                <div className="properties-search__grid">
                  {filteredResults.map((p) => (
                    <article key={p.id} className="property-card">
                      <div
                        className="property-card__image"
                        aria-hidden="true"
                      />
                      <div className="property-card__body">
                        <div className="property-card__meta">
                          <span className="property-card__id">{p.id}</span>
                          <span className="property-card__type">{p.type}</span>
                        </div>

                        <h3 className="property-card__title">{p.title}</h3>
                        <p className="property-card__location">
                          {p.suburb}, {p.state}
                        </p>

                        <div className="property-card__stats">
                          <span>{p.beds} bed</span>
                          <span>{p.baths} bath</span>
                          <span>{p.cars} car</span>
                        </div>

                        <div className="property-card__price">
                          {p.priceLabel}
                        </div>

                        <button className="property-card__btn" type="button">
                          View details
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PropertiesSearch;
