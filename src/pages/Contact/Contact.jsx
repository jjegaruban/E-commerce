import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaComment, 
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock 
} from "react-icons/fa";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  
  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  // Form state
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    messages: ""
  });

  // Error state
  const [errors, setErrors] = useState({
    clientName: "",
    email: "",
    messages: ""
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Email validation
  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = "Please enter your name";
    } else if (formData.clientName.trim().length < 2) {
      newErrors.clientName = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.messages.trim()) {
      newErrors.messages = "Please enter your message";
    } else if (formData.messages.trim().length < 10) {
      newErrors.messages = "Message must be at least 10 characters";
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setSuccessMsg(
          `Thank you ${formData.clientName}! Your message has been received. We'll get back to you at ${formData.email} within 24 hours.`
        );
        setIsSubmitting(false);
        
        // Reset form
        setFormData({
          clientName: "",
          email: "",
          messages: ""
        });
      }, 1500);
    } else {
      setErrors(newErrors);
      
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      clientName: "",
      email: "",
      messages: ""
    });
    setErrors({});
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs title="Contact Us" prevLocation={prevLocation} />
      
      <AnimatePresence mode="wait">
        {successMsg ? (
          <motion.div
            key="success"
            {...fadeInUp}
            className="max-w-2xl mx-auto text-center py-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaPaperPlane className="text-3xl text-gray-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                Message Sent!
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {successMsg}
              </p>
              <button
                onClick={() => setSuccessMsg("")}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8"
          >
            {/* Contact Information */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                  Get in Touch
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Have questions about our products? Need help with an order? 
                  We're here to help! Fill out the form and we'll get back to 
                  you as soon as possible.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4 pt-4">
                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                    <p className="text-gray-600">Saturday: 10am - 4pm</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600">123 Business Avenue</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div 
                variants={fadeInUp}
                className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden"
              >
                <iframe
                  title="Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1644262074185!5m2!1sen!2s"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="bg-gray-50 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg outline-none transition-all duration-300 ${
                        errors.clientName
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:border-gray-400'
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.clientName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <span className="text-xs">⚠</span>
                        {errors.clientName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg outline-none transition-all duration-300 ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:border-gray-400'
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <span className="text-xs">⚠</span>
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Message Field */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FaComment className="text-gray-400" />
                    </div>
                    <textarea
                      name="messages"
                      value={formData.messages}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows="4"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg outline-none transition-all duration-300 resize-none ${
                        errors.messages
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:border-gray-400'
                      }`}
                    ></textarea>
                  </div>
                  <AnimatePresence>
                    {errors.messages && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                      >
                        <span className="text-xs">⚠</span>
                        {errors.messages}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.messages.length}/500 characters
                  </p>
                </motion.div>

                {/* Form Actions */}
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center gap-4 pt-4"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium border border-gray-200"
                  >
                    Reset
                  </button>
                </motion.div>

                {/* Form note */}
                <motion.p 
                  variants={fadeInUp}
                  className="text-xs text-gray-500 text-center"
                >
                  We'll respond to your message within 24 hours.
                </motion.p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;