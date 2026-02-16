// src/pages/AgentProfile/AgentProfile.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./AgentProfile.scss";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import ProfileFooter from "../../../components/ProfileFooter/ProfileFooter";

type TabType =
  | "general-profile"
  | "settings"
  | "reviews"
  | "saved-items"
  | "my-properties";

const AgentProfile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general-profile");

  const tabs = [
    { id: "general-profile" as TabType, label: "General Profile" },
    { id: "settings" as TabType, label: "Settings" },
    { id: "reviews" as TabType, label: "Reviews" },
    { id: "saved-items" as TabType, label: "Saved Items" },
    { id: "my-properties" as TabType, label: "My Properties" },
  ];

  const roleOptions = [
    "Sales",
    "Leasing",
    "Property Manager",
    "Administration",
    "Auctioneer",
    "Principal",
    "Accounts",
  ];

  return (
    <div className="agent-profile">
      {/* Header */}
      <ProfileHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as TabType)}
      />

      {/* Content */}
      <div className="agent-profile__content">
        {/* General Profile Tab */}
        {activeTab === "general-profile" && (
          <div className="agent-profile__section">
            <h2>General Profile</h2>
            <hr className="agent-profile__divider" />

            <div className="agent-profile__form-group">
              <label>First Name, Surname</label>
              <input type="text" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>Mobile</label>
              <input type="tel" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>Email</label>
              <input type="email" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>Secondary (Personal) Email</label>
              <input type="email" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>Photo – Upload</label>
              <input
                type="file"
                accept="image/*"
                className="agent-profile__file-input"
              />
            </div>

            <div className="agent-profile__form-group">
              <label>
                URL – Your URL address of your profile on Agency website
              </label>
              <input
                type="url"
                className="agent-profile__input"
                placeholder="https://"
              />
            </div>

            <div className="agent-profile__form-group">
              <label>Role in real estate</label>
              <div className="agent-profile__role-options">
                {roleOptions.map((role) => (
                  <button key={role} className="agent-profile__role-btn">
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="agent-profile__form-group">
              <label>Currently working at (which real estate office)</label>
              <input type="text" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>Street Address of Office</label>
              <input type="text" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>URL of office</label>
              <input
                type="url"
                className="agent-profile__input"
                placeholder="https://"
              />
            </div>

            <div className="agent-profile__form-group">
              <label>General Phone Number of Office</label>
              <input type="tel" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>Unique CRM ID of Office ?????</label>
              <input type="text" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>Logo of Office</label>
              <input
                type="file"
                accept="image/*"
                className="agent-profile__file-input"
              />
            </div>

            <div className="agent-profile__form-group">
              <label>About you – BIO</label>
              <textarea className="agent-profile__textarea" rows={5} />
            </div>

            <div className="agent-profile__form-group">
              <label>Current Sales and/or Leasing</label>
              <input type="text" className="agent-profile__input" />
            </div>

            <div className="agent-profile__form-group">
              <label>Past Sales and/or Leasing</label>
              <input type="text" className="agent-profile__input" />
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="agent-profile__section">
            <h2>Settings</h2>
            <hr className="agent-profile__divider" />

            <div className="agent-profile__checkbox-group">
              <label className="agent-profile__checkbox">
                <input type="checkbox" />
                <span>Allow BSL to contact you by email and sms</span>
              </label>
              <label className="agent-profile__checkbox">
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
          <div className="agent-profile__section">
            <h2>Reviews</h2>
            <hr className="agent-profile__divider" />
            <p>All posted reviews about you</p>
          </div>
        )}

        {/* Saved Items Tab */}
        {activeTab === "saved-items" && (
          <div className="agent-profile__section">
            <h2>Saved Items</h2>
            <hr className="agent-profile__divider" />

            <div className="agent-profile__links-list">
              <Link to="/real-estate-videos">Real Estate Videos</Link>
              <Link to="/real-estate-blogs">Real Estate Blogs</Link>
              <Link to="/real-estate-training">Real Estate Training</Link>
              <Link to="/newsletters">Newsletters</Link>
            </div>
          </div>
        )}

        {/* My Properties Tab */}
        {activeTab === "my-properties" && (
          <div className="agent-profile__section">
            <h2>My Properties</h2>
            <hr className="agent-profile__divider" />

            <div className="agent-profile__links-list">
              <Link to="/active-properties">
                My active properties for sale/lease
              </Link>
              <Link to="/history">My history of sales/leasing</Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <ProfileFooter />
    </div>
  );
};

export default AgentProfile;
