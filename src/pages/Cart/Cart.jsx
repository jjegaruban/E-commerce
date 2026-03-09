import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images";
import ItemCard from "./ItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Calculate total
  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [products]);

  // Calculate shipping
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  // Apply coupon
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setDiscount(totalAmt * 0.1);
      setCouponApplied(true);
    } else if (couponCode.toLowerCase() === "save20") {
      setDiscount(totalAmt * 0.2);
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  // Calculate final total
  const finalTotal = totalAmt + shippingCharge - discount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs title="Shopping Cart" />
      
      {products.length > 0 ? (
        <div className="space-y-8">
          {/* Cart Items Header - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            <AnimatePresence>
              {products.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <ItemCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-t border-gray-200">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your cart?")) {
                  dispatch(resetCart());
                }
              }}
              className="px-6 py-2 border border-gray-300 text-sm hover:bg-gray-100 transition-colors"
            >
              Clear Cart
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              {/* Coupon Input */}
              <div className="flex w-full sm:w-auto">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-500 w-full sm:w-40"
                  disabled={couponApplied}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied || !couponCode}
                  className={`px-4 py-2 border border-l-0 border-gray-300 text-sm transition-colors ${
                    couponApplied
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Apply
                </button>
              </div>

              {couponApplied && (
                <span className="text-sm text-gray-600">
                  Discount applied: -${discount.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="flex justify-end">
            <div className="w-full md:w-96 bg-gray-50 p-6 space-y-4">
              <h2 className="text-lg font-medium border-b border-gray-200 pb-2">
                Order Summary
              </h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalAmt.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCharge === 0 ? "Free" : `$${shippingCharge.toFixed(2)}`}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg">${finalTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Including VAT
                  </p>
                </div>
              </div>

              <Link to="/paymentgateway">
                <button className="w-full bg-gray-900 text-white py-3 text-sm hover:bg-gray-800 transition-colors mt-4">
                  Proceed to Checkout
                </button>
              </Link>

              <Link 
                to="/shop" 
                className="block text-center text-sm text-gray-600 hover:text-gray-900 border-b border-gray-300 pb-0.5 w-fit mx-auto"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl text-gray-400">🛒</span>
            </div>
            
            <h2 className="text-2xl font-light text-gray-900 mb-3">
              Your cart is empty
            </h2>
            
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
              Browse our shop to find something you'll love.
            </p>
            
            <Link to="/shop">
              <button className="bg-gray-900 text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors">
                Start Shopping
              </button>
            </Link>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <Link to="/offer" className="hover:text-gray-900 border-b border-gray-300 pb-0.5">
                Special Offers
              </Link>
              <Link to="/contact" className="hover:text-gray-900 border-b border-gray-300 pb-0.5">
                Need Help?
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;