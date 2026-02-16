// src/pages/AgencyProfile/AgencyProfile.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./AgencyProfile.scss";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import ProfileFooter from "../../../components/ProfileFooter/ProfileFooter";

type TabType =
  | "general-profile"
  | "property"
  | "settings"
  | "reviews"
  | "saved-items"
  | "submit"
  | "recruitment";

const AgencyProfile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general-profile");

  const tabs = [
    { id: "general-profile" as TabType, label: "General Profile" },
    { id: "property" as TabType, label: "Property" },
    { id: "settings" as TabType, label: "Settings" },
    { id: "reviews" as TabType, label: "Reviews" },
    { id: "saved-items" as TabType, label: "Saved Items" },
    { id: "submit" as TabType, label: "Submit" },
    { id: "recruitment" as TabType, label: "Recruitment" },
  ];

  return (
    <div className="agency-profile">
      {/* Header */}
      <ProfileHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as TabType)}
      />

      {/* Content */}
      <div className="agency-profile__content">
        {/* General Profile Tab */}
        {activeTab === "general-profile" && (
          <div className="agency-profile__section">
            <h2>General Profile</h2>
            <hr className="agency-profile__divider" />

            <div className="agency-profile__form-group">
              <label>
                Name of Agency – Each office location needs its own Profile
                Setup
              </label>
              <input type="text" className="agency-profile__input" />
            </div>

            <div className="agency-profile__form-group">
              <label>Street Address – Suburb – State – Postcode</label>
              <input type="text" className="agency-profile__input" />
            </div>

            <div className="agency-profile__form-group">
              <label>Principal Name</label>
              <input type="text" className="agency-profile__input" />
            </div>

            <div className="agency-profile__form-group">
              <label>Principal Email</label>
              <input type="email" className="agency-profile__input" />
            </div>

            <div className="agency-profile__form-group">
              <label>Principal Mobile</label>
              <input type="tel" className="agency-profile__input" />
            </div>

            <div className="agency-profile__form-group">
              <label>General Office Email</label>
              <input type="email" className="agency-profile__input" />
            </div>

            <div className="agency-profile__form-group">
              <label>General Office Phone</label>
              <input type="tel" className="agency-profile__input" />
            </div>

            <div className="agency-profile__subsection">
              <h3>Person in charge of your CRM Management</h3>

              <div className="agency-profile__form-group">
                <label>Office CRM Manager Name</label>
                <input type="text" className="agency-profile__input" />
              </div>

              <div className="agency-profile__form-group">
                <label>Office CRM Manager Email</label>
                <input type="email" className="agency-profile__input" />
              </div>

              <div className="agency-profile__form-group">
                <label>Office CRM Manager Mobile</label>
                <input type="tel" className="agency-profile__input" />
              </div>
            </div>

            <div className="agency-profile__form-group">
              <label>URL Address of Office</label>
              <input
                type="url"
                className="agency-profile__input"
                placeholder="https://"
              />
            </div>

            <div className="agency-profile__form-group">
              <label>URL of "Meet the Team Page"</label>
              <input
                type="url"
                className="agency-profile__input"
                placeholder="https://"
              />
            </div>

            <div className="agency-profile__form-group">
              <label>CRM Manager – Drop down box</label>
              <select className="agency-profile__input">
                <option value="">Select CRM Manager</option>
                <option value="manager1">Manager 1</option>
                <option value="manager2">Manager 2</option>
              </select>
            </div>

            <div className="agency-profile__form-group">
              <label>Agency Unique ID</label>
              <input type="text" className="agency-profile__input" />
            </div>

            <div className="agency-profile__form-group">
              <label>Logo – Type of Image – size, etc</label>
              <input
                type="file"
                accept="image/*"
                className="agency-profile__file-input"
              />
            </div>

            <div className="agency-profile__form-group">
              <label>"About Us" section</label>
              <textarea className="agency-profile__textarea" rows={6} />
            </div>
          </div>
        )}

        {/* Property Tab */}
        {activeTab === "property" && (
          <div className="agency-profile__section">
            <h2>Property</h2>
            <hr className="agency-profile__divider" />

            <div className="agency-profile__subsection">
              <h3>Current Sales and/or Leasing</h3>
              <p>Days on Market v Other listings days on market</p>
            </div>

            <div className="agency-profile__subsection">
              <h3>Past Sales and/or Leasing</h3>
            </div>

            <div className="agency-profile__subsection">
              <h3>Statistics and Analytics</h3>
              <p>
                Sales Market Share by Suburb – no. of listings v total listings
                in a suburb by month, Calendar year to date
              </p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="agency-profile__section">
            <h2>Settings</h2>
            <hr className="agency-profile__divider" />

            <div className="agency-profile__checkbox-group">
              <label className="agency-profile__checkbox">
                <input type="checkbox" />
                <span>Allow BSL to contact you by email and sms</span>
              </label>
              <label className="agency-profile__checkbox">
                <input type="checkbox" />
                <span>
                  Send Alert when job appears in my category and location
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="agency-profile__section">
            <h2>Reviews</h2>
            <hr className="agency-profile__divider" />
            <p>All posted reviews about you</p>
          </div>
        )}

        {/* Saved Items Tab */}
        {activeTab === "saved-items" && (
          <div className="agency-profile__section">
            <h2>Saved Items</h2>
            <hr className="agency-profile__divider" />

            <div className="agency-profile__links-list">
              <Link to="/real-estate-videos">Real Estate Videos</Link>
              <Link to="/real-estate-blogs">Real Estate Blogs</Link>
              <Link to="/real-estate-training">Real Estate Training</Link>
              <Link to="/newsletters">Newsletters</Link>
              <Link to="/active-properties">
                My active properties for sale/lease
              </Link>
              <Link to="/history">My history of sales/leasing</Link>
            </div>
          </div>
        )}

        {/* Submit Tab */}
        {activeTab === "submit" && (
          <div className="agency-profile__section">
            <h2>Submit an Item to BSL to post</h2>
            <hr className="agency-profile__divider" />

            <div className="agency-profile__links-list">
              <Link to="/submit-message">Submit a message</Link>
              <Link to="/submit-video">Submit a video</Link>
              <Link to="/submit-campaign">Submit a campaign</Link>
            </div>
          </div>
        )}

        {/* Recruitment Tab */}
        {activeTab === "recruitment" && (
          <div className="agency-profile__section">
            <h2>Recruitment</h2>
            <hr className="agency-profile__divider" />

            <div className="agency-profile__links-list">
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

export default AgencyProfile;
