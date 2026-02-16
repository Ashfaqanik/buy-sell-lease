import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaUser, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";

interface DropdownItem {
  label: string;
  path: string;
  description?: string;
}

interface NavItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "BUY", path: "/buy" },
  { label: "SELL", path: "/sell" },
  { label: "LEASE", path: "/lease" },
  {
    label: "FIND AN AGENCY/AGENT",
    path: "/find-agent",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "Find an Agent",
        path: "/find-agent",
        description: "Search for individual real estate agents",
      },
      {
        label: "Find an Agency",
        path: "/find-agency",
        description: "Browse real estate agencies",
      },
    ],
  },
  { label: "FIND A REAL ESTATE SERVICE", path: "/find-services" },
  { label: "TOOLS FOR AGENTS", path: "/tools-for-agents" },
  { label: "ADVERTISE", path: "/advertise" },
  { label: "FIND A REAL ESTATE JOB", path: "/jobs" },
  { label: "BLOGS", path: "/blog" },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <img src="/bsl_logo.png" alt="Buy Sell Lease Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar__menu">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="navbar__item"
                onMouseEnter={() =>
                  item.hasDropdown && handleMouseEnter(item.label)
                }
                onMouseLeave={handleMouseLeave}
              >
                <Link to={item.path} className="navbar__link">
                  {item.label}
                  {item.hasDropdown && (
                    <FaChevronDown className="navbar__chevron" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="navbar__dropdown">
                    {item.dropdownItems?.map((dropItem) => (
                      <Link
                        key={dropItem.label}
                        to={dropItem.path}
                        className="navbar__dropdown-item"
                      >
                        <span className="navbar__dropdown-label">
                          {dropItem.label}
                        </span>
                        {dropItem.description && (
                          <span className="navbar__dropdown-description">
                            {dropItem.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="navbar__actions">
            <Link to="/sign-in" className="navbar__login-btn">
              <FaUser size={18} />
              <span>JOIN / LOGIN</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer - Outside nav to cover full screen */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="navbar__mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Drawer */}
          <div className="navbar__mobile-drawer">
            <div className="navbar__mobile-drawer-header">
              {/* Logo */}
              <Link
                to="/"
                className="navbar__logo"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src="/bsl_logo.png" alt="Buy Sell Lease Logo" />
              </Link>

              <button
                className="navbar__mobile-close"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="navbar__mobile-drawer-body">
              {navItems.map((item) => (
                <div key={item.label} className="navbar__mobile-drawer-item">
                  <Link
                    to={item.path}
                    className="navbar__mobile-drawer-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="navbar__mobile-drawer-sub">
                      {item.dropdownItems.map((dropItem) => (
                        <Link
                          key={dropItem.label}
                          to={dropItem.path}
                          className="navbar__mobile-drawer-sublink"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
