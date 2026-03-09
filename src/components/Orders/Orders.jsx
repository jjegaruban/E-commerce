import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Orders = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs title="My Orders" />
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No orders yet</p>
        <Link to="/shop">
          <button className="bg-gray-900 text-white px-6 py-2 hover:bg-gray-800">
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Orders;