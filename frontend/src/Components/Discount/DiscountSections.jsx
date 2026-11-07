import React from 'react';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const DiscountSections = ({
  badge = 'Trending Collection',
  title = 'Over the Siren Book Collections',
  subtitle = 'Discover timeless stories, knowledge & inspiration. Find yours!',
  image,
  bgImage,
  buttonText = 'Shop Now',
}) => {
  return (
    <section
      className="relative w-full h-[calc(100vh-64px-150px)] min-h-[420px] max-h-[580px] lg:max-h-[620px] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {/* Soft, clean pastel ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50/85 via-white/95 to-rose-50/85 pointer-events-none" />

      {/* Main Container: Text on LEFT, Image on RIGHT, centered towards middle */}
      <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-4 sm:gap-8 md:gap-10 lg:gap-16">
        
        {/* Left Column: Typography & Action Button */}
        <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left space-y-2.5 sm:space-y-3.5 lg:space-y-4 min-w-0">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              {badge}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-black text-gray-900 leading-[1.15] tracking-tight">
            {title}
          </h1>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
            {subtitle}
          </p>

          {/* Standard Red Pill CTA Button */}
          <div className="pt-1 sm:pt-2">
            <button className="inline-flex items-center gap-2 px-6 sm:px-7 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/25 transition-all duration-200 active:scale-95 cursor-pointer">
              <FiShoppingBag className="text-sm sm:text-base" />
              <span>{buttonText}</span>
              <FiArrowRight className="text-sm sm:text-base" />
            </button>
          </div>
        </div>

        {/* Right Column: Product Image */}
        <div className="w-full md:w-5/12 flex items-center justify-center md:justify-end shrink-0">
          <div className="relative flex items-center justify-center p-2">
            <img
              src={image}
              alt={title}
              className="h-40 sm:h-52 md:h-64 lg:h-76 xl:h-88 w-auto max-w-[85%] md:max-w-full object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default DiscountSections;