import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import Notification from "../../components/Notification/Notification";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    type: "success"
  });

  useEffect(() => {
    // Check if we have a notification from added to cart
    if (location.state?.addedToCart) {
      showNotification(location.state.message || "Item added to cart successfully!");
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const showNotification = (message, type = "success") => {
    setNotification({
      visible: true,
      message,
      type
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      visible: false
    }));
  };

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.visible}
        onClose={hideNotification}
      />
      
      <Breadcrumbs title="Shop" />
      
      <div className="flex flex-col lg:flex-row gap-8 py-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-24">
            <ShopSideNav />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <div className="mt-8">
            <Pagination 
              itemsPerPage={itemsPerPage} 
              showNotification={showNotification}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;