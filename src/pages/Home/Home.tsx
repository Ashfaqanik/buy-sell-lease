import HeroSearch from "../../components/HeroSearch/HeroSearch";
import "./Home.scss";
import PageLayout from "../../layouts/PageLayout";

const Home = () => {
  return (
    <PageLayout>
      <div className="home">
        <main className="home__main">
          <HeroSearch />

          {/* Featured Properties Section - Placeholder for future development */}
          <section className="home__section home__section--featured">
            <div className="home__container">
              <h2 className="home__section-title">Featured Properties</h2>
              <p className="home__section-subtitle">
                Discover our handpicked selection of premium properties
              </p>
              <div className="home__placeholder">
                <p>Property cards will be displayed here</p>
                <p className="home__placeholder-note">
                  (To be integrated with backend API)
                </p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="home__section home__section--services">
            <div className="home__container">
              <h2 className="home__section-title">Real Estate Services</h2>
              <p className="home__section-subtitle">
                Connect with trusted professionals for all your property needs
              </p>
              <div className="home__services-grid">
                {[
                  "Conveyancer",
                  "Mortgage Broker",
                  "Property Valuer",
                  "Building Inspector",
                  "Removalist",
                  "Landscaper",
                ].map((service) => (
                  <div key={service} className="home__service-card">
                    <h3 className="home__service-name">{service}</h3>
                    <p className="home__service-description">
                      Professional {service.toLowerCase()} services for your
                      real estate needs
                    </p>
                    <button className="home__service-btn">
                      Find {service}s
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="home__section home__section--tools">
            <div className="home__container">
              <h2 className="home__section-title">Tools & Calculators</h2>
              <p className="home__section-subtitle">
                Plan your property journey with our free tools
              </p>
              <div className="home__tools-grid">
                <div className="home__tool-card">
                  <h3 className="home__tool-name">Mortgage Calculator</h3>
                  <p className="home__tool-description">
                    Calculate your monthly repayments and total interest
                  </p>
                  <button className="home__tool-btn">Calculate Now</button>
                </div>
                <div className="home__tool-card">
                  <h3 className="home__tool-name">Stamp Duty Calculator</h3>
                  <p className="home__tool-description">
                    Estimate stamp duty costs for your property purchase
                  </p>
                  <button className="home__tool-btn">Calculate Now</button>
                </div>
                <div className="home__tool-card">
                  <h3 className="home__tool-name">Property Alerts</h3>
                  <p className="home__tool-description">
                    Get notified when new properties match your criteria
                  </p>
                  <button className="home__tool-btn">Set Up Alerts</button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="home__section home__section--cta">
            <div className="home__container">
              <div className="home__cta-content">
                <h2 className="home__cta-title">
                  Are you a Real Estate Agent?
                </h2>
                <p className="home__cta-text">
                  Join thousands of agents already using Buy Sell Lease to reach
                  more buyers and sellers
                </p>
                <div className="home__cta-buttons">
                  <button className="home__cta-btn home__cta-btn--primary">
                    List Your Properties
                  </button>
                  <button className="home__cta-btn home__cta-btn--secondary">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  );
};

export default Home;
