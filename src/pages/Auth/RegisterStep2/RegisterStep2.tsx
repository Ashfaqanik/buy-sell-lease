import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserTie,
  FaBuilding,
  FaTools,
  FaWrench,
} from "react-icons/fa";
import "./RegisterStep2.scss";

type UserCategory = "consumer" | "agent" | "agency" | "service" | "tool";

interface CategoryOption {
  id: UserCategory;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const categories: CategoryOption[] = [
  {
    id: "consumer",
    label: "Consumer",
    description: "Looking to Buy, Sell or Lease property",
    icon: <FaHome />,
  },
  {
    id: "agent",
    label: "Real Estate Agent",
    description: "Individual agent profile",
    icon: <FaUserTie />,
  },
  {
    id: "agency",
    label: "Real Estate Office",
    description: "Agency/Office profile",
    icon: <FaBuilding />,
  },
  {
    id: "service",
    label: "Real Estate Service",
    description: "Helping you to buy, sell and lease property",
    icon: <FaTools />,
  },
  {
    id: "tool",
    label: "Real Estate Tool",
    description: "Business assisting real estate agents/agencies",
    icon: <FaWrench />,
  },
];

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<UserCategory | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = async (categoryId: UserCategory) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);

    console.log("Selected category:", categoryId);

    setTimeout(() => {
      setIsLoading(false);
      switch (categoryId) {
        case "consumer":
          navigate("/consumer/profile");
          break;
        case "agent":
          navigate("/agent/profile");
          break;
        case "agency":
          navigate("/agency/profile");
          break;
        case "service":
          navigate("/service/profile");
          break;
        case "tool":
          navigate("/tools/profile");
          break;
        default:
          navigate("/");
      }
    }, 800);
  };

  return (
    <div className="register-step2">
      <div className="register-step2__container">
        <div className="register-step2__header">
          <h1 className="register-step2__title">Select Your Category</h1>
          <p className="register-step2__subtitle">
            Choose how you'll use Buy Sell Lease
          </p>
        </div>

        <div className="register-step2__categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`register-step2__card ${selectedCategory === category.id ? "register-step2__card--selected" : ""}`}
              onClick={() => handleCategorySelect(category.id)}
              disabled={isLoading}
            >
              <div className="register-step2__icon">{category.icon}</div>
              <h3 className="register-step2__card-title">{category.label}</h3>
              <p className="register-step2__card-desc">
                {category.description}
              </p>

              {selectedCategory === category.id && isLoading && (
                <span className="register-step2__loading">Setting up...</span>
              )}
            </button>
          ))}
        </div>

        <div className="register-step2__help">
          <p>
            Not sure which to choose?{" "}
            <span className="register-step2__link">
              Learn more about categories
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2;
