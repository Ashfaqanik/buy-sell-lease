// src/pages/ServiceProfile/ServiceProfile.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ServiceProfile.scss";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import ProfileFooter from "../../../components/ProfileFooter/ProfileFooter";

type TabType =
  | "general-profile"
  | "settings"
  | "reviews"
  | "saved-items"
  | "analytics"
  | "submit"
  | "recruitment";

const ServiceProfile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general-profile");

  const tabs = [
    { id: "general-profile" as TabType, label: "General Profile" },
    { id: "settings" as TabType, label: "Settings" },
    { id: "reviews" as TabType, label: "Reviews" },
    { id: "saved-items" as TabType, label: "Saved Items" },
    { id: "analytics" as TabType, label: "Analytics" },
    { id: "submit" as TabType, label: "Submit" },
    { id: "recruitment" as TabType, label: "Recruitment" },
  ];

  const serviceCategories = [
    "Conveyancer",
    "Mortgage broker",
    "Valuer",
    "Landlord and Property Insurance",
    "Buyers Agents",
    "Surveyors/Depreciation Reports",
    "Removalists and Storage",
    "Pest and Building Inspectors",
    "Gardening and Landscape",
    "Rubbish removal and Skip Bins",
    "Painters",
    "Locksmiths",
    "Utility Connection and Supply",
  ];

  return (
    <div className="service-profile">
      {/* Header */}
      <ProfileHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as TabType)}
      />

      {/* Content */}
      <div className="service-profile__content">
        {/* General Profile Tab */}
        {activeTab === "general-profile" && (
          <div className="service-profile__section">
            <h2>General Profile</h2>
            <hr className="service-profile__divider" />

            <div className="service-profile__form-group">
              <label>Category – Drop down box to select</label>
              <select className="service-profile__input">
                <option value="">Select category</option>
                {serviceCategories.map((category) => (
                  <option
                    key={category}
                    value={category.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="service-profile__form-group">
              <label>Name of Business</label>
              <input type="text" className="service-profile__input" />
            </div>

            <div className="service-profile__form-group">
              <label>Street Address – Suburb – State – Postcode</label>
              <input type="text" className="service-profile__input" />
            </div>

            <div className="service-profile__form-group">
              <label>Principal Name</label>
              <input type="text" className="service-profile__input" />
            </div>

            <div className="service-profile__form-group">
              <label>Principal Mobile</label>
              <input type="tel" className="service-profile__input" />
            </div>

            <div className="service-profile__form-group">
              <label>Office Email</label>
              <input type="email" className="service-profile__input" />
            </div>

            <div className="service-profile__form-group">
              <label>Office Phone</label>
              <input type="tel" className="service-profile__input" />
            </div>

            <div className="service-profile__form-group">
              <label>
                URL Address of Business – If you are part of a franchise, select
                your direct office URL Eg www.mybusiness.com.au/maroubra
              </label>
              <input
                type="url"
                className="service-profile__input"
                placeholder="https://"
              />
            </div>

            <div className="service-profile__form-group">
              <label>Logo – Type of Image – size, etc</label>
              <input
                type="file"
                accept="image/*"
                className="service-profile__file-input"
              />
            </div>

            <div className="service-profile__form-group">
              <label>"About Us" section</label>
              <textarea className="service-profile__textarea" rows={6} />
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="service-profile__section">
            <h2>Settings</h2>
            <hr className="service-profile__divider" />

            <div className="service-profile__checkbox-group">
              <label className="service-profile__checkbox">
                <input type="checkbox" />
                <span>Allow BSL to contact you by email and sms</span>
              </label>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="service-profile__section">
            <h2>Reviews</h2>
            <hr className="service-profile__divider" />
            <p>All posted reviews about you</p>
          </div>
        )}

        {/* Saved Items Tab */}
        {activeTab === "saved-items" && (
          <div className="service-profile__section">
            <h2>Saved Items</h2>
            <hr className="service-profile__divider" />

            <div className="service-profile__links-list">
              <Link to="/newsletters">Newsletters</Link>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="service-profile__section">
            <h2>Analytics</h2>
            <hr className="service-profile__divider" />

            <div className="service-profile__subsection">
              <h3>Data of monthly visits through Buy Sell Lease</h3>
              <p className="service-profile__hint">
                Analytics data will be displayed here
              </p>
            </div>
          </div>
        )}

        {/* Submit Tab */}
        {activeTab === "submit" && (
          <div className="service-profile__section">
            <h2>Submit an Item to BSL to post</h2>
            <hr className="service-profile__divider" />

            <div className="service-profile__links-list service-profile__links-list--indented">
              <Link to="/submit-message">Submit a message</Link>
              <Link to="/submit-video">Submit a video</Link>
              <Link to="/submit-campaign">Submit a campaign</Link>
              <Link to="/submit-article">Submit an article</Link>
            </div>
          </div>
        )}

        {/* Recruitment Tab */}
        {activeTab === "recruitment" && (
          <div className="service-profile__section">
            <h2>Recruitment</h2>
            <hr className="service-profile__divider" />

            <div className="service-profile__links-list service-profile__links-list--indented">
              <Link to="/post-ad">Post a new Ad</Link>
              <Link to="/previous-ads">Previous Ads</Link>
              <Link to="/current-candidates">Current Candidates</Link>
              <Link to="/previous-candidates">Previous Candidates</Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <ProfileFooter />
    </div>
  );
};

export default ServiceProfile;
