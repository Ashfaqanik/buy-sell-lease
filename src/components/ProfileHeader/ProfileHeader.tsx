import { Link } from "react-router-dom";
import "./ProfileHeader.scss";

interface Tab {
  id: string;
  label: string;
}

interface ProfileHeaderProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const ProfileHeader = ({
  tabs,
  activeTab,
  onTabChange,
}: ProfileHeaderProps) => {
  return (
    <header className="profile-header">
      <Link to="/" className="profile-header__logo">
        <img src="/bsl_logo.png" alt="Buy Sell Lease Logo" />
      </Link>

      <nav className="profile-header__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`profile-header__tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default ProfileHeader;
