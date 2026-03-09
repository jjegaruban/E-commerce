import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/orebiSlice";
import { motion } from "framer-motion";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add to cart
    dispatch(
      addToCart({
        _id: productInfo._id,
        name: productInfo.productName,
        quantity: quantity,
        image: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        colors: productInfo.color,
      })
    );

    // Show success and redirect
    setTimeout(() => {
      setIsAdding(false);
      navigate("/cart", { 
        state: { 
          addedToCart: true, 
          message: `${productInfo.productName} added to cart!` 
        } 
      });
    }, 500);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title and Price */}
      <div>
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          {productInfo.productName}
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-medium text-gray-900">
            ${productInfo.price}
          </span>
          {productInfo.oldPrice && (
            <span className="text-lg text-gray-400 line-through">
              ${productInfo.oldPrice}
            </span>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-gray-300 text-lg">
              {i < Math.floor(productInfo.rating || 4) ? "★" : "☆"}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500">
          ({productInfo.reviews || 0} reviews)
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {productInfo.des}
      </p>

      {/* Color */}
      {productInfo.color && (
        <div className="space-y-2">
          <span className="text-sm text-gray-500">Color:</span>
          <p className="font-medium">{productInfo.color}</p>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-2">
        <span className="text-sm text-gray-500">Quantity:</span>
        <div className="flex items-center">
          <button
            onClick={decrementQuantity}
            className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 bg-gray-900 text-white py-4 text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></span>
              Adding...
            </span>
          ) : (
            "Add to Cart"
          )}
        </motion.button>
        
        <button className="w-14 h-14 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <span className="text-xl">♡</span>
        </button>
      </div>

      {/* Categories */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Categories:</span>{" "}
          {productInfo.categories || "Spring Collection, Streetwear, Women"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-gray-700">SKU:</span>{" "}
          {productInfo.sku || `PRD-${productInfo._id}`}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-gray-700">Availability:</span>{" "}
          <span className="text-gray-900">In Stock</span>
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;