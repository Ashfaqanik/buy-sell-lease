import { useState } from "react";
import { Link } from "react-router-dom";
import "./ConsumerProfile.scss";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import ProfileFooter from "../../../components/ProfileFooter/ProfileFooter";

type TabType =
  | "reviews"
  | "saved-searches"
  | "profile"
  | "account-settings"
  | "subscriptions";

const ConsumerProfile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("account-settings");

  const tabs = [
    { id: "reviews" as TabType, label: "Reviews" },
    { id: "saved-searches" as TabType, label: "Saved Searches" },
    { id: "profile" as TabType, label: "Profile" },
    { id: "account-settings" as TabType, label: "Account Settings" },
    { id: "subscriptions" as TabType, label: "Subscriptions" },
  ];

  return (
    <div className="consumer-profile">
      <ProfileHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as TabType)}
      />

      {/* Content */}
      <div className="consumer-profile__content">
        {/* Account Settings Tab */}
        {activeTab === "account-settings" && (
          <div className="consumer-profile__section">
            <h2>My Account Settings</h2>
            <hr className="consumer-profile__divider" />

            <div className="consumer-profile__form">
              <div className="consumer-profile__form-group">
                <label>
                  Email{" "}
                  <Link
                    to="/edit-email"
                    className="consumer-profile__edit-link"
                  >
                    (Edit email)
                  </Link>
                </label>
                <input
                  type="email"
                  defaultValue="nach@buyselllease.com.au"
                  className="consumer-profile__input"
                />
              </div>

              <div className="consumer-profile__form-group">
                <label>
                  Password{" "}
                  <Link
                    to="/edit-password"
                    className="consumer-profile__edit-link"
                  >
                    (Edit password)
                  </Link>
                </label>
                <input
                  type="password"
                  defaultValue="******"
                  className="consumer-profile__input"
                />
              </div>

              <div className="consumer-profile__checkbox-group">
                <label className="consumer-profile__checkbox">
                  <input type="checkbox" />
                  <span>Allow BSL Services to contact you</span>
                </label>
                <label className="consumer-profile__checkbox">
                  <input type="checkbox" />
                  <span>Allow BSL to send you emails and sms messages</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <>
            <div className="consumer-profile__section">
              <h2>Consumer Registration and Profile Input</h2>
              <hr className="consumer-profile__divider" />

              <div className="consumer-profile__form-group">
                <label>Name</label>
                <input type="text" className="consumer-profile__input" />
              </div>

              <div className="consumer-profile__form-group">
                <label>Gender</label>
                <select className="consumer-profile__input">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="consumer-profile__form-group">
                <label>Age – not specific but select from group</label>
                <div className="consumer-profile__age-buttons">
                  <button className="consumer-profile__age-btn">(18-25)</button>
                  <button className="consumer-profile__age-btn">(26-35)</button>
                  <button className="consumer-profile__age-btn">(36-50)</button>
                  <button className="consumer-profile__age-btn">(51+)</button>
                </div>
              </div>

              <div className="consumer-profile__form-group">
                <label>Profession Industry (drop down box of selection)</label>
                <select className="consumer-profile__input">
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="consumer-profile__form-group">
                <label>Suburb/Postcode (of residence)</label>
                <input type="text" className="consumer-profile__input" />
              </div>
            </div>

            <div className="consumer-profile__section">
              <h2>Consumer Profile fields</h2>

              <div className="consumer-profile__profile-header">
                <strong>Profile</strong>
                <span>
                  Personalise your account and update your login preferences
                </span>
              </div>

              <div className="consumer-profile__links-list">
                <Link to="/saved-property-searches">
                  Saved property searches
                </Link>
                <Link to="/saved-service-searches">Saved Service searches</Link>
                <Link to="/saved-job-searches">Saved job searches</Link>
                <Link to="/past-reviews">Past reviews</Link>
                <Link to="/tenancy-application">Tenancy Application</Link>
                <Link to="/submitted-tenancy-applications">
                  Submitted Tenancy Applications
                </Link>
                <Link to="/bidder-registration">Bidder Registration form</Link>
              </div>

              <button className="consumer-profile__signout">Sign Out</button>
            </div>
          </>
        )}

        {/* Saved Searches Tab */}
        {activeTab === "saved-searches" && (
          <>
            <div className="consumer-profile__section">
              <h2>Saved Property Searches</h2>
              <hr className="consumer-profile__divider" />

              <div className="consumer-profile__subsection">
                <h3>Active Listings</h3>
                <p className="consumer-profile__hint">
                  (list with link to property when clicked)
                </p>
              </div>
            </div>

            <div className="consumer-profile__section">
              <h2>Saved Searches</h2>
              <p className="consumer-profile__question">
                How often would you like to receive emails about each of your
                saved searches?
              </p>

              <div className="consumer-profile__radio-group">
                <label className="consumer-profile__radio">
                  <input type="radio" name="frequency" />
                  <span>Instant any changes made</span>
                </label>
                <label className="consumer-profile__radio">
                  <input type="radio" name="frequency" />
                  <span>Daily</span>
                </label>
                <label className="consumer-profile__radio">
                  <input type="radio" name="frequency" />
                  <span>Weekly</span>
                </label>
              </div>
            </div>
          </>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="consumer-profile__section">
            <h3 className="consumer-profile__section-title">Reviews</h3>
            <hr className="consumer-profile__divider" />
            <p className="consumer-profile__empty">No reviews yet.</p>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <div className="consumer-profile__section">
            <h2>Manage Subscriptions</h2>
            <hr className="consumer-profile__divider" />
            <p className="consumer-profile__unsubscribe">
              Don't want to receive email notifications?{" "}
              <Link to="/unsubscribe">
                Unsubscribe from all email notifications
              </Link>
            </p>
          </div>
        )}
      </div>
      <ProfileFooter />
    </div>
  );
};

export default ConsumerProfile;
