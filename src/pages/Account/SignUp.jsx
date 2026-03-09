import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignUp = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "",
    zip: ""
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = "Name must be at least 2 characters";
      }
      
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = "Please enter a valid phone number";
      }
      
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = "Password must contain uppercase, lowercase and number";
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else if (currentStep === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }
      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }
      if (!formData.country.trim()) {
        newErrors.country = "Country is required";
      }
      if (!formData.zip.trim()) {
        newErrors.zip = "ZIP code is required";
      }
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(2);
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      alert("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length === 0) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setSuccessMsg(`Welcome ${formData.fullName}! Your account has been created successfully.`);
        setIsLoading(false);
        
        // Reset form after success
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }, 1500);
    } else {
      setErrors(stepErrors);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 flex-col justify-between p-12">
        <div>
          <Link to="/">
            <img src={logoLight} alt="Jegaruban" className="w-24" />
          </Link>
        </div>
        
        <div className="max-w-md">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            SHOP NOW
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Create an account to enjoy faster checkout, order tracking, and exclusive offers.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Account details</h3>
                <p className="text-sm text-gray-600">Your basic information and login</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shipping address</h3>
                <p className="text-sm text-gray-600">Where we'll deliver your orders</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900">All set</h3>
                <p className="text-sm text-gray-600">Start shopping</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            © Jegaruban
          </Link>
          <Link to="/terms" className="hover:text-gray-900 transition-colors">
            Terms
          </Link>
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">
            Privacy
          </Link>
          <Link to="/security" className="hover:text-gray-900 transition-colors">
            Security
          </Link>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {successMsg ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✓</span>
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-3">
                Account created!
              </h2>
              <p className="text-gray-600 mb-6">
                {successMsg}
              </p>
              <p className="text-sm text-gray-500">
                Redirecting you to sign in...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-2">
                  Create account
                </h2>
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/signin" className="border-b border-gray-300 pb-0.5 hover:border-gray-900 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Progress indicator for mobile */}
              <div className="flex items-center justify-center gap-2 mb-6 lg:hidden">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentStep === 1 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  1
                </div>
                <div className="w-8 h-0.5 bg-gray-200"></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentStep === 2 ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  2
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Account Details */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-gray-500"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-2">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-gray-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-2">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                          errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-gray-500"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-2">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                            errors.password
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-gray-500"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500 mt-2">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                            errors.confirmPassword
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-gray-500"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-2">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors mt-4"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* Step 2: Address Details */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St"
                        className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                          errors.address
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-gray-500"
                        }`}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500 mt-2">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                          errors.city
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-gray-500"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500 mt-2">{errors.city}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="USA"
                          className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                            errors.country
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-gray-500"
                          }`}
                        />
                        {errors.country && (
                          <p className="text-sm text-red-500 mt-2">{errors.country}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          placeholder="10001"
                          className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors ${
                            errors.zip
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-gray-500"
                          }`}
                        />
                        {errors.zip && (
                          <p className="text-sm text-red-500 mt-2">{errors.zip}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mt-4">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-4 h-4 mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{" "}
                        <Link to="/terms" className="border-b border-gray-300 pb-0.5 hover:border-gray-900">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="border-b border-gray-300 pb-0.5 hover:border-gray-900">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 bg-white text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? "Creating..." : "Create account"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;