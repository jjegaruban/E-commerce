import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Notification = ({ message, isVisible, onClose, product }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
          <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            {/* Progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="h-1 bg-gray-900"
            />
            
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Success icon */}
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Added to Cart!
                  </p>
                  <p className="text-sm text-gray-600">
                    {message}
                  </p>
                  
                  {/* Product preview */}
                  {product && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {product.img && (
                          <img 
                            src={product.img} 
                            alt={product.productName}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 line-clamp-1">
                          {product.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${product.price} × {product.quantity || 1}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="flex items-center gap-2 mt-3">
                    <Link
                      to="/cart"
                      className="flex-1 bg-gray-900 text-white text-xs py-2 text-center hover:bg-gray-800 transition-colors"
                      onClick={onClose}
                    >
                      View Cart
                    </Link>
                    <button
                      onClick={onClose}
                      className="flex-1 border border-gray-300 text-gray-700 text-xs py-2 hover:bg-gray-50 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <span className="text-lg">×</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;