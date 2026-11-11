import React from "react";
import { FiTruck, FiShield, FiTag, FiLock } from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: <FiTruck className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
      title: "Free & Fast Delivery",
      description: "Delivered right to your doorstep across Bangladesh.",
    },
    {
      icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
      title: "100% Authentic Quality",
      description: "Every item is verified & backed by warranty.",
    },
    {
      icon: <FiTag className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
      title: "Daily Flash Drops",
      description: "Exclusive member discounts and promo coupon codes.",
    },
    {
      icon: <FiLock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
      title: "100% Secure Checkout",
      description: "256-Bit SSL encrypted payments & Cash on Delivery.",
    },
  ];

  return (
    <section className="w-full bg-white py-6 sm:py-8 border-b border-gray-100">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-2.5 shadow-xs">
                {feature.icon}
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-1 text-[11px] sm:text-xs text-gray-500 leading-relaxed max-w-[200px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
