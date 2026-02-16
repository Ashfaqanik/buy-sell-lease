// src/pages/ToolsProfile/ToolsProfile.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ToolsProfile.scss";
import ProfileHeader from "../../../components/ProfileHeader/ProfileHeader";
import ProfileFooter from "../../../components/ProfileFooter/ProfileFooter";

type TabType =
  | "general-profile"
  | "settings"
  | "reviews"
  | "saved-items"
  | "submit"
  | "recruitment";

const ToolsProfile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general-profile");

  const tabs = [
    { id: "general-profile" as TabType, label: "General Profile" },
    { id: "settings" as TabType, label: "Settings" },
    { id: "reviews" as TabType, label: "Reviews" },
    { id: "saved-items" as TabType, label: "Saved Items" },
    { id: "submit" as TabType, label: "Submit" },
    { id: "recruitment" as TabType, label: "Recruitment" },
  ];

  return (
    <div className="tools-profile">
      {/* Header  */}
      <ProfileHeader
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as TabType)}
      />

      {/* Content */}
      <div className="tools-profile__content">
        {/* General Profile Tab */}
        {activeTab === "general-profile" && (
          <div className="tools-profile__section">
            <h2>General Profile</h2>
            <hr className="tools-profile__divider" />

            <div className="tools-profile__form-group">
              <label>Category of Business</label>
              <select className="tools-profile__input">
                <option value="">Select category</option>
                <option value="software">Software</option>
                <option value="marketing">Marketing</option>
                <option value="photography">Photography</option>
                <option value="staging">Home Staging</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="tools-profile__form-group">
              <label>Name of Business</label>
              <input type="text" className="tools-profile__input" />
            </div>

            <div className="tools-profile__form-group">
              <label>Street Address – Suburb – State – Postcode</label>
              <input type="text" className="tools-profile__input" />
            </div>

            <div className="tools-profile__form-group">
              <label>Principal Name</label>
              <input type="text" className="tools-profile__input" />
            </div>

            <div className="tools-profile__form-group">
              <label>Principal Email</label>
              <input type="email" className="tools-profile__input" />
            </div>

            <div className="tools-profile__form-group">
              <label>Principal Mobile</label>
              <input type="tel" className="tools-profile__input" />
            </div>

            <div className="tools-profile__form-group">
              <label>General Office Email</label>
              <input type="email" className="tools-profile__input" />
            </div>

            <div className="tools-profile__form-group">
              <label>General Office Phone</label>
              <input type="tel" className="tools-profile__input" />
            </div>

            <div className="tools-profile__form-group">
              <label>URL Address of Office</label>
              <input
                type="url"
                className="tools-profile__input"
                placeholder="https://"
              />
            </div>

            <div className="tools-profile__form-group">
              <label>Logo – Type of Image – size, etc</label>
              <input
                type="file"
                accept="image/*"
                className="tools-profile__file-input"
              />
            </div>

            <div className="tools-profile__form-group">
              <label>"About Us" section</label>
              <textarea className="tools-profile__textarea" rows={6} />
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="tools-profile__section">
            <h2>Settings</h2>
            <hr className="tools-profile__divider" />

            <div className="tools-profile__checkbox-group">
              <label className="tools-profile__checkbox">
                <input type="checkbox" />
                <span>Allow BSL to contact you by email and sms</span>
              </label>
              <label className="tools-profile__checkbox">
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
          <div className="tools-profile__section">
            <h2>Reviews</h2>
            <hr className="tools-profile__divider" />
            <p>All posted reviews about you</p>
          </div>
        )}

        {/* Saved Items Tab */}
        {activeTab === "saved-items" && (
          <div className="tools-profile__section">
            <h2>Saved Items</h2>
            <hr className="tools-profile__divider" />

            <div className="tools-profile__links-list">
              <Link to="/real-estate-videos">Real Estate Videos</Link>
              <Link to="/real-estate-blogs">Real Estate Blogs</Link>
              <Link to="/real-estate-training">Real Estate Training</Link>
              <Link to="/newsletters">Newsletters</Link>
            </div>
          </div>
        )}

        {/* Submit Tab */}
        {activeTab === "submit" && (
          <div className="tools-profile__section">
            <h2>Submit an Item to BSL to post</h2>
            <hr className="tools-profile__divider" />

            <div className="tools-profile__links-list tools-profile__links-list--indented">
              <Link to="/submit-message">Submit a message</Link>
              <Link to="/submit-video">Submit a video</Link>
              <Link to="/submit-campaign">Submit a campaign</Link>
              <Link to="/submit-article">Submit an article</Link>
            </div>
          </div>
        )}

        {/* Recruitment Tab */}
        {activeTab === "recruitment" && (
          <div className="tools-profile__section">
            <h2>Recruitment</h2>
            <hr className="tools-profile__divider" />

            <div className="tools-profile__links-list tools-profile__links-list--indented">
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

      {/* Alert Note */}
      {/* <div className="tools-profile__alert-note">
        <p>
          Alert sent by email and sms when we have sent something to their
          profile – it could be a new property, newsletter, etc.. then they
          check their profile for the message.
        </p>
      </div> */}
    </div>
  );
};

export default ToolsProfile;
