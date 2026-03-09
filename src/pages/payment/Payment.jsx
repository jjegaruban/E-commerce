import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    saveCard: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? "/" + v.substring(2, 4) : "");
    }
    return v;
  };

  if (completed) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs title="Payment" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center py-12"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          
          <h2 className="text-2xl font-light text-gray-900 mb-3">
            Payment Successful!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          
          <div className="bg-gray-50 p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">Order summary:</p>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Order number:</span>
              <span className="font-medium">ORD-{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Total paid:</span>
              <span className="font-medium">$249.98</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment method:</span>
              <span className="font-medium capitalize">{paymentMethod}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <button className="w-full sm:w-auto px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                Continue Shopping
              </button>
            </Link>
            {/* Comment out or remove this until you add the orders route
            <Link to="/orders">
              <button className="w-full sm:w-auto px-6 py-2 border border-gray-300 hover:bg-gray-50 transition-colors">
                View Orders
              </button>
            </Link>
            */}
          </div>
        </motion.div>
      </div>
    );
  }

  // Rest of your component remains exactly the same...
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs title="Payment" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-lg font-medium mb-6">Payment Details</h2>
            
            {/* Payment Method Selection */}
            <div className="mb-6">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">PayPal</span>
                </label>
              </div>
            </div>

            {paymentMethod === "card" ? (
              <form onSubmit={handlePayment} className="space-y-4">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      setFormData(prev => ({ ...prev, cardNumber: formatted }));
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-2 border border-gray-300 focus:border-gray-500 outline-none transition-colors"
                    required
                  />
                </div>

                {/* Card Holder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card holder name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 focus:border-gray-500 outline-none transition-colors"
                    required
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={(e) => {
                        const formatted = formatExpiry(e.target.value);
                        setFormData(prev => ({ ...prev, expiry: formatted }));
                      }}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-2 border border-gray-300 focus:border-gray-500 outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      className="w-full px-4 py-2 border border-gray-300 focus:border-gray-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Save Card */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="saveCard"
                    id="saveCard"
                    checked={formData.saveCard}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="saveCard" className="text-sm text-gray-600">
                    Save this card for future purchases
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gray-900 text-white py-3 mt-4 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></span>
                      Processing...
                    </span>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </form>
            ) : (
              // PayPal Mock
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">P</span>
                </div>
                <p className="text-gray-600 mb-4">
                  You'll be redirected to PayPal to complete your payment.
                </p>
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-gray-900 text-white py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {processing ? "Processing..." : "Continue with PayPal"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 sticky top-24">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal (2 items)</span>
                <span>$220.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>$25.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>$4.98</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">$249.98</span>
                </div>
              </div>
            </div>

            {/* Sample items */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-200 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Product Name</p>
                  <p className="text-xs text-gray-500">Qty: 1</p>
                  <p className="text-sm mt-1">$120.00</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-200 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Another Product</p>
                  <p className="text-xs text-gray-500">Qty: 1</p>
                  <p className="text-sm mt-1">$100.00</p>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <p className="text-xs text-gray-500 text-center">
                This is a demo payment page. No actual payment will be processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;