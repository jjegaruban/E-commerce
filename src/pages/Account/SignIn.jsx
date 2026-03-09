import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let hasError = false;
    
    if (!email) {
      setErrEmail("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrEmail("Please enter a valid email");
      hasError = true;
    }
    
    if (!password) {
      setErrPassword("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
      hasError = true;
    }
    
    if (!hasError) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setSuccessMsg(`Welcome back! You have successfully signed in.`);
        setIsLoading(false);
        
        // Reset form after success
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }, 1500);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@jegaruban.com");
    setPassword("demo123456");
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
            Welcome back
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Sign in to access your account, track orders, and manage your preferences.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-gray-700">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Track your orders</h3>
                <p className="text-sm text-gray-600">View order history and status in real-time</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-gray-700">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Manage your wishlist</h3>
                <p className="text-sm text-gray-600">Save items you love for later</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-gray-700">✓</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Express checkout</h3>
                <p className="text-sm text-gray-600">Faster purchasing with saved details</p>
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
                Signed in successfully
              </h2>
              <p className="text-gray-600 mb-6">
                {successMsg}
              </p>
              <p className="text-sm text-gray-500">
                Redirecting you to the homepage...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl font-light text-gray-900 mb-2">
                  Sign in
                </h2>
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="border-b border-gray-300 pb-0.5 hover:border-gray-900 transition-colors">
                    Create one
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors text-gray-900 placeholder-gray-400 ${
                      errEmail
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-gray-500"
                    }`}
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 mt-2">
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-gray-500 hover:text-gray-900 border-b border-gray-300 pb-0.5"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePassword}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 bg-white border rounded-lg outline-none transition-colors text-gray-900 placeholder-gray-400 ${
                        errPassword
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-gray-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errPassword && (
                    <p className="text-sm text-red-500 mt-2">
                      {errPassword}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>

                {/* Demo button */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-white text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Use demo account
                </button>

                {/* Mobile sign up link */}
                <p className="text-center text-sm text-gray-600 lg:hidden">
                  Don't have an account?{" "}
                  <Link to="/signup" className="border-b border-gray-300 pb-0.5 hover:border-gray-900">
                    Sign up
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;