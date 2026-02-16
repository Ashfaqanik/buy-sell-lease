import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    console.log("Password reset requested for:", email);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password__container">
        <div className="forgot-password__header">
          <h1 className="forgot-password__title">Reset Your Password</h1>
          <p className="forgot-password__subtitle">
            Enter your email to receive reset instructions
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="forgot-password__form">
            <div className="forgot-password__field">
              <label htmlFor="email" className="forgot-password__label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`forgot-password__input ${error ? "forgot-password__input--error" : ""}`}
                placeholder="Enter your account email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <span className="forgot-password__error">{error}</span>}
            </div>

            <button
              type="submit"
              className="forgot-password__submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="forgot-password__success">
            <div className="forgot-password__success-icon">✓</div>
            <h3>Check Your Email</h3>
            <p>We've sent password reset instructions to {email}</p>
          </div>
        )}

        <div className="forgot-password__footer">
          <p>
            Remember your password?{" "}
            <Link to="/sign-in" className="forgot-password__link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
