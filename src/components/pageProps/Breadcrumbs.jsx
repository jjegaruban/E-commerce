import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ prevLocation, title }) => {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState("");
  
  useEffect(() => {
    setLocationPath(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <div className="w-full py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center text-sm">
          <ol className="flex items-center flex-wrap gap-1">
            <li className="flex items-center">
              <Link 
                to="/" 
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            
            <li className="flex items-center">
              <HiOutlineChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              <span className="text-gray-500 dark:text-gray-400">
                {prevLocation === "" ? "Home" : prevLocation}
              </span>
            </li>
            
            <li className="flex items-center">
              <HiOutlineChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              <span className="font-medium text-gray-900 dark:text-white">
                {locationPath.charAt(0).toUpperCase() + locationPath.slice(1) || title}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;