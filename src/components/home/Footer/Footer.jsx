import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscribe = () => {
    if (!email) {
      setError("Please enter your email.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email.");
    } else {
      setSubscribed(true);
      setError("");
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#F5F5F3] py-16">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 px-4">

        {/* About */}
        <div>
          <FooterListTitle title="About Our Store" />
          <p className="text-sm text-gray-600 leading-6 mt-4">
            Discover quality products curated for modern lifestyles. 
            We offer fashion, electronics, accessories and more with 
            secure payments and fast delivery.
          </p>

          <div className="flex gap-3 mt-6">
            <a href="#" target="_blank" rel="noreferrer">
              <div className="footerIcon">
                <FaYoutube />
              </div>
            </a>

            <a href="https://github.com/jjegaruban" target="_blank" rel="noreferrer">
              <div className="footerIcon">
                <FaGithub />
              </div>
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <div className="footerIcon">
                <FaFacebook />
              </div>
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <div className="footerIcon">
                <FaLinkedin />
              </div>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <FooterListTitle title="Shop" />
          <ul className="footerList">
            <li>Accessories</li>
            <li>Clothing</li>
            <li>Electronics</li>
            <li>Home Appliances</li>
            <li>New Arrivals</li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <FooterListTitle title="Your Account" />
          <ul className="footerList">
            <li>Profile</li>
            <li>Orders</li>
            <li>Addresses</li>
            <li>Account Details</li>
            <li>Payment Methods</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <FooterListTitle title="Newsletter" />
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to receive updates, new products, and special offers.
          </p>

          {subscribed ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-semibold"
            >
              Subscription successful!
            </motion.p>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-4 border border-gray-300 outline-none"
              />

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                onClick={handleSubscribe}
                className="bg-black text-white py-2 hover:bg-gray-800 duration-300"
              >
                Subscribe
              </button>
            </div>
          )}

          <Image
            className="w-[70%] mt-6"
            imgSrc={paymentCard}
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;