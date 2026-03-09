import React from "react";
import { Link } from "react-router-dom";
import { SplOfferData } from "../../../constants";

const ProductsOnSale = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium border-b border-gray-200 pb-2">
        On Sale
      </h3>
      
      <div className="space-y-3">
        {SplOfferData.map((item) => (
          <Link 
            to={`/product/${item._id}`} 
            key={item._id}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors group"
          >
            {/* Product Image */}
            <div className="w-16 h-16 bg-gray-100 flex-shrink-0 overflow-hidden">
              <img 
                src={item.img} 
                alt={item.productName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                {item.productName}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-gray-900">
                  ${item.price}
                </span>
                {item.oldPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${item.oldPrice}
                  </span>
                )}
              </div>
              {item.discount && (
                <span className="text-xs text-gray-500">
                  Save {item.discount}%
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {/* View All Link */}
      <Link 
        to="/shop?filter=sale" 
        className="block text-center text-sm text-gray-600 hover:text-gray-900 border border-gray-200 py-2 mt-2 hover:bg-gray-50 transition-colors"
      >
        View All Offers
      </Link>
    </div>
  );
};

export default ProductsOnSale;