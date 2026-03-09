import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  
  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      
      {/* Main content */}
      <div className="space-y-12">
        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">Our story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in 2020, Jegaruban began with a simple idea: create well-designed, 
            quality products that people would love to use every day. What started as 
            a small collection has grown into a curated selection of goods for home, 
            work, and life.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We work directly with makers and manufacturers who share our commitment to 
            quality and thoughtful design. Every product we carry is chosen for its 
            utility, durability, and aesthetic.
          </p>
        </section>

        {/* Values */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">What matters to us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Quality</h3>
              <p className="text-sm text-gray-600">
                We believe in products that last. Each item is vetted for materials, 
                construction, and finish.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Simplicity</h3>
              <p className="text-sm text-gray-600">
                Clean design that works. No unnecessary features, just what you need.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Service</h3>
              <p className="text-sm text-gray-600">
                Help when you need it. We're here to make sure you're happy with your purchase.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="space-y-4">
          <h2 className="text-2xl font-light tracking-tight">The team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Jegaruban", role: "Founder" },
              { name: "Sarah Chen", role: "Product" },
              { name: "Marcus Wright", role: "Operations" },
              { name: "Elena Rodriguez", role: "Customer experience" }
            ].map((person) => (
              <div key={person.name} className="border border-gray-200 p-4">
                <div className="w-16 h-16 bg-gray-100 mb-3"></div>
                <h3 className="font-medium">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact note */}
        <section className="border-t border-gray-200 pt-8">
          <p className="text-gray-600">
            Questions? <Link to="/contact" className="border-b border-gray-300 pb-0.5 hover:border-gray-900">Get in touch</Link>
          </p>
        </section>

        {/* Continue shopping link */}
        <div className="pt-4">
          <Link 
            to="/shop" 
            className="inline-block border border-gray-300 px-6 py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            Browse our shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;