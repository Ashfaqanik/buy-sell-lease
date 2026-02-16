import { useState } from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import GoogleIcon from "../../../components/Icons/GoogleIcon";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    console.log("Sign in attempt:", formData);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log("Social login with:", provider);
  };

  return (
    <div className="signin">
      <div className="signin__container">
        <div className="signin__header">
          <h1 className="signin__title">Welcome to Buy Sell Lease</h1>
          <p className="signin__subtitle">Sign In | New Account</p>
        </div>

        <form onSubmit={handleSubmit} className="signin__form">
          <div className="signin__field">
            <label htmlFor="email" className="signin__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`signin__input ${errors.email ? "signin__input--error" : ""}`}
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <span className="signin__error">{errors.email}</span>
            )}
          </div>

          <div className="signin__field">
            <label htmlFor="password" className="signin__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`signin__input ${errors.password ? "signin__input--error" : ""}`}
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <span className="signin__error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="signin__submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="signin__links">
          <Link to="/forgot-password" className="signin__link">
            Forgot your password?
          </Link>
        </div>

        <div className="signin__divider">
          <span>Or connect with:</span>
        </div>

        <div className="signin__social">
          <button
            className="signin__social-btn signin__social-btn--apple"
            onClick={() => handleSocialLogin("apple")}
          >
            <FaApple />
            <span>Continue with Apple</span>
          </button>
          <button
            className="signin__social-btn signin__social-btn--facebook"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FaFacebook />
            <span>Continue with Facebook</span>
          </button>
          <button
            className="signin__social-btn signin__social-btn--google"
            onClick={() => handleSocialLogin("google")}
          >
            <GoogleIcon size={20} />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="signin__footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="signin__link">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
