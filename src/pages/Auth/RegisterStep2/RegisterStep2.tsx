import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaApple, FaFacebook } from "react-icons/fa";
import "./RegisterStep2.scss";
import GoogleIcon from "../../../components/Icons/GoogleIcon";

interface PasswordValidation {
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasMinLength: boolean;
}

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string): PasswordValidation => ({
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasMinLength: password.length >= 8,
  });

  const passwordValidation = validatePassword(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!Object.values(passwordValidation).every(Boolean)) {
      newErrors.password = "Password does not meet requirements";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    console.log("Registration step 1:", {
      email: formData.email,
      password: formData.password,
    });

    setTimeout(() => {
      setIsLoading(false);
      navigate("/register/step-2");
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log("Social login with:", provider);
    // TODO: Implement OAuth flow
  };

  const allRequirementsMet = Object.values(passwordValidation).every(Boolean);

  return (
    <div className="register-step1">
      <div className="register-step1__container">
        <div className="register-step1__header">
          <h1 className="register-step1__title">Welcome to Buy Sell Lease</h1>
          <p className="register-step1__subtitle">Create New Account</p>
        </div>

        <form onSubmit={handleSubmit} className="register-step1__form">
          <div className="register-step1__field">
            <label htmlFor="email" className="register-step1__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`register-step1__input ${errors.email ? "register-step1__input--error" : ""}`}
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <span className="register-step1__error">{errors.email}</span>
            )}
          </div>

          <div className="register-step1__field">
            <label htmlFor="password" className="register-step1__label">
              Password
            </label>
            <div className="register-step1__input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`register-step1__input ${errors.password ? "register-step1__input--error" : ""}`}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="register-step1__toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div className="register-step1__requirements">
              <p className="register-step1__requirements-title">
                Password must include:
              </p>
              <ul className="register-step1__requirements-list">
                <li className={passwordValidation.hasUpperCase ? "met" : ""}>
                  Large Caps (A-Z)
                </li>
                <li className={passwordValidation.hasLowerCase ? "met" : ""}>
                  Small Caps (a-z)
                </li>
                <li className={passwordValidation.hasNumber ? "met" : ""}>
                  Numbers (0-9)
                </li>
                <li className={passwordValidation.hasSymbol ? "met" : ""}>
                  Symbol (!@#$...)
                </li>
                <li className={passwordValidation.hasMinLength ? "met" : ""}>
                  8 characters minimum
                </li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            className="register-step1__submit"
            disabled={isLoading || !allRequirementsMet}
          >
            {isLoading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        {/* Divider */}
        <div className="register-step1__divider">
          <span>Or connect with:</span>
        </div>

        {/* Social Login */}
        <div className="register-step1__social">
          <button
            className="register-step1__social-btn register-step1__social-btn--apple"
            onClick={() => handleSocialLogin("apple")}
          >
            <FaApple />
            <span>Continue with Apple</span>
          </button>

          <button
            className="register-step1__social-btn register-step1__social-btn--facebook"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FaFacebook />
            <span>Continue with Facebook</span>
          </button>

          <button
            className="register-step1__social-btn register-step1__social-btn--google"
            onClick={() => handleSocialLogin("google")}
          >
            <GoogleIcon size={20} />

            <span>Continue with Google</span>
          </button>
        </div>

        <div className="register-step1__footer">
          <p>
            Already have an account?{" "}
            <Link to="/sign-in" className="register-step1__link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;
