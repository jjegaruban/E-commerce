import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      dispatch(deleteItem(item._id));
    }, 300);
  };

  return (
    <motion.div
      layout
      className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-gray-200 hover:border-gray-300 transition-colors bg-white"
    >
      {/* Product Info - Mobile & Desktop */}
      <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:border-gray-500 hover:text-gray-900 transition-colors flex-shrink-0"
          aria-label="Remove item"
        >
          ×
        </button>

        {/* Product Image */}
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl text-gray-300">📦</span>
          )}
        </div>

        {/* Product Name */}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 line-clamp-2">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 md:hidden">
            ${item.price} each
          </p>
        </div>
      </div>

      {/* Price - Desktop */}
      <div className="hidden md:block w-24 text-center">
        <span className="text-gray-900">${item.price}</span>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between md:justify-center w-full md:w-32 gap-4">
        <div className="flex items-center border border-gray-300">
          <button
            onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
            className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 transition-colors border-r border-gray-300"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
            className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 transition-colors border-l border-gray-300"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Mobile Price */}
        <div className="md:hidden">
          <span className="font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Subtotal - Desktop */}
      <div className="hidden md:block w-24 text-right font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </motion.div>
  );
};

export default ItemCard;