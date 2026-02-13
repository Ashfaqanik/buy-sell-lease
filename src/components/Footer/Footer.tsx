import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.scss";

const footerLinks = {
  company: [
    { label: "About", path: "/about" },
    { label: "Careers", path: "/jobs" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ],
  tools: [
    { label: "Mortgage Calculator", path: "/mortgage-calculator" },
    { label: "Stamp Duty Calculator", path: "/stamp-duty" },
    { label: "Property Alerts", path: "/alerts" },
    { label: "Market Insights", path: "/insights" },
  ],
  agents: [
    { label: "Tools for Agents", path: "/tools" },
    { label: "Advertise", path: "/advertise" },
    { label: "Agent Login", path: "/login" },
    { label: "Support", path: "/help" },
  ],
  legal: [
    { label: "Terms of Use", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Cookie Preferences", path: "/cookies" },
    { label: "Sitemap", path: "/sitemap" },
  ],
};

const socialLinks = [
  { icon: <FaFacebook />, label: "Facebook", url: "#" },
  { icon: <FaTwitter />, label: "Twitter", url: "#" },
  { icon: <FaInstagram />, label: "Instagram", url: "#" },
  { icon: <FaLinkedin />, label: "LinkedIn", url: "#" },
  { icon: <FaYoutube />, label: "YouTube", url: "#" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="navbar__logo">
              <img src="/bsl_logo.png" alt="Buy Sell Lease Logo" />
            </Link>
            <p className="footer__tagline">
              Everything real estate, under one roof!
            </p>
            <div className="footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="footer__social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer__links">
            <h4 className="footer__title">Company</h4>
            <ul className="footer__list">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links">
            <h4 className="footer__title">Tools</h4>
            <ul className="footer__list">
              {footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links">
            <h4 className="footer__title">For Agents</h4>
            <ul className="footer__list">
              {footerLinks.agents.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links">
            <h4 className="footer__title">Legal</h4>
            <ul className="footer__list">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Buy Sell Lease. All rights reserved.
          </p>
          <div className="footer__apps">
            <span className="footer__apps-label">Get our app:</span>
            <a href="#" className="footer__app-link">
              <img
                src="/badges/app-store-badge.svg"
                alt="Download on the App Store"
                className="footer__app-badge"
              />
            </a>
            <a href="#" className="footer__app-link">
              <img
                src="/badges/google-play-badge.png"
                alt="Get it on Google Play"
                className="footer__app-badge"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
