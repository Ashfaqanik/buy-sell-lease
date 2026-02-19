import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import "./PropertiesResults.scss";

type PropertyCategory = "residential" | "commercial";

type PropertyResult = {
  id: string; // later comes from backend identifier
  title: string;
  suburb: string;
  state: string;
  postcode: string;
  priceLabel: string;
  beds: number;
  baths: number;
  cars: number;
  propertyType: string;
  category: PropertyCategory;
};

const MOCK_RESULTS: PropertyResult[] = [
  {
    id: "BSL-PROP-0001",
    title: "Modern Family Home",
    suburb: "Perth",
    state: "WA",
    postcode: "6000",
    priceLabel: "$950,000",
    beds: 3,
    baths: 2,
    cars: 2,
    propertyType: "House",
    category: "residential",
  },
  {
    id: "BSL-PROP-0002",
    title: "City Apartment",
    suburb: "Melbourne",
    state: "VIC",
    postcode: "3000",
    priceLabel: "$720,000",
    beds: 2,
    baths: 1,
    cars: 1,
    propertyType: "Apartment/Unit",
    category: "residential",
  },
  {
    id: "BSL-PROP-0003",
    title: "Retail Space - Prime Location",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    priceLabel: "$1.4M",
    beds: 0,
    baths: 1,
    cars: 0,
    propertyType: "Shop & Retail",
    category: "commercial",
  },
];

export default function PropertiesResults() {
  const [params] = useSearchParams();

  const summary = useMemo(() => {
    const location = params.get("location") || "Any location";
    const searchType = (params.get("searchType") || "buy").toLowerCase();
    const category =
      (params.get("category") as PropertyCategory) || "residential";
    const propertyType = params.get("propertyType") || "All types";
    const beds = params.get("beds") || "Any";
    const min = params.get("min") || "Any";
    const max = params.get("max") || "Any";

    return { location, searchType, category, propertyType, beds, min, max };
  }, [params]);

  return (
    <div className="properties-results">
      <Navbar />

      <main className="properties-results__main">
        <div className="properties-results__container">
          {/* Header */}
          <div className="properties-results__header">
            <div>
              <h1 className="properties-results__title">Property Results</h1>
              <p className="properties-results__subtitle">
                Location: <strong>{summary.location}</strong>
              </p>
            </div>

            <div className="properties-results__actions">
              <label className="properties-results__sort">
                Sort:
                <select defaultValue="relevance">
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="price_low">Price (Low → High)</option>
                  <option value="price_high">Price (High → Low)</option>
                </select>
              </label>

              <Link to="/" className="properties-results__back">
                Back to Home
              </Link>
            </div>
          </div>

          <div className="properties-results__layout">
            {/* Sidebar */}
            <aside className="properties-results__sidebar">
              <h2 className="properties-results__sidebar-title">
                Your Filters
              </h2>

              <div className="properties-results__chip">
                <span>Search type</span>
                <strong>{summary.searchType}</strong>
              </div>

              <div className="properties-results__chip">
                <span>Category</span>
                <strong>{summary.category}</strong>
              </div>

              <div className="properties-results__chip">
                <span>Property type</span>
                <strong>{summary.propertyType}</strong>
              </div>

              <div className="properties-results__chip">
                <span>Beds</span>
                <strong>{summary.beds}</strong>
              </div>

              <div className="properties-results__chip">
                <span>Price</span>
                <strong>
                  {summary.min} – {summary.max}
                </strong>
              </div>

              <button className="properties-results__refine" type="button">
                Refine Filters (coming soon)
              </button>
            </aside>

            {/* Results */}
            <section className="properties-results__results">
              <div className="properties-results__count">
                {MOCK_RESULTS.length} results found
              </div>

              <div className="properties-results__grid">
                {MOCK_RESULTS.map((p) => (
                  <article key={p.id} className="properties-results__card">
                    <div className="properties-results__image" />

                    <div className="properties-results__card-body">
                      <div className="properties-results__meta">
                        <span className="properties-results__badge">
                          {p.category}
                        </span>
                        <span className="properties-results__id">{p.id}</span>
                      </div>

                      <h3 className="properties-results__card-title">
                        {p.title}
                      </h3>

                      <p className="properties-results__location">
                        {p.suburb}, {p.state} {p.postcode}
                      </p>

                      <div className="properties-results__price">
                        {p.priceLabel}
                      </div>

                      <div className="properties-results__specs">
                        <span>{p.beds > 0 ? `${p.beds} bed` : "— bed"}</span>
                        <span>{p.baths} bath</span>
                        <span>{p.cars} car</span>
                        <span>{p.propertyType}</span>
                      </div>

                      <button
                        className="properties-results__view"
                        type="button"
                      >
                        View details
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
