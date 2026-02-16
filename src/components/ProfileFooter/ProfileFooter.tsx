import { Link } from "react-router-dom";
import "./ProfileFooter.scss";

const ProfileFooter = () => {
  return (
    <footer className="profile-footer">
      <div className="profile-footer__links">
        <Link to="/about">About</Link>
        <Link to="/research">Research</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/help">Help</Link>
        <Link to="/advertise">Advertise</Link>
        <Link to="/fair-housing">Fair Housing Guide</Link>
        <Link to="/terms">Terms of use</Link>
        <Link to="/privacy">Privacy Portal</Link>
        <Link to="/blog">Blog</Link>
      </div>
    </footer>
  );
};

export default ProfileFooter;
