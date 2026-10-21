import React from 'react';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import defaultBg from '../../assets/image/carousel-bg-books.jpg';

const CarouselSlide = ({
  badge = 'Trending Collection',
  title = 'Explore the World of Books',
  subtitle = 'Discover thousands of books across genres. Knowledge and stories at your fingertips.',
  image,
  bgImage = defaultBg,
  buttonText = 'Shop Products',
  tagColor = 'rose',
}) => {
  // Theme color styles using pure Tailwind CSS classes
  const badgeStyles = {
    rose: 'bg-rose-50 text-rose-600 border-rose-200/80',
    blue: 'bg-blue-50 text-blue-600 border-blue-200/80',
    purple: 'bg-purple-50 text-purple-600 border-purple-200/80',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80',
  };

  const buttonStyles = {
    rose: 'bg-rose-600 hover:bg-rose-700 shadow-rose-200 hover:shadow-rose-300',
    blue: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:shadow-blue-300',
    purple: 'bg-purple-600 hover:bg-purple-700 shadow-purple-200 hover:shadow-purple-300',
    amber: 'bg-amber-600 hover:bg-amber-700 shadow-amber-200 hover:shadow-amber-300',
  };

  const currentBadgeStyle = badgeStyles[tagColor] || badgeStyles.rose;
  const currentButtonStyle = buttonStyles[tagColor] || buttonStyles.rose;

  return (
    <section
      className="relative w-full min-h-[480px] sm:min-h-[540px] md:min-h-[600px] lg:min-h-[650px] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden py-10 md:py-16 px-6 sm:px-10 lg:px-16"
      style={{ backgroundImage: `url(${bgImage || defaultBg})` }}
    >
      {/* Light soft gradient overlay for optimal text readability & seamless blend with white navbar & footer */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/35 to-transparent pointer-events-none" />

      {/* Main Slide Content Grid: guarantees exactly 50/50 balance and prevents text overflow */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography & Action Button */}
        <div className="flex flex-col items-start text-left space-y-4 sm:space-y-5 min-w-0">
          {badge && (
            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border backdrop-blur-xs ${currentBadgeStyle} transition-all duration-300 shadow-xs`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {badge}
            </span>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.18] tracking-tight break-words">
            {title}
          </h1>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed font-normal">
            {subtitle}
          </p>

          {/* Interactive CTA Button */}
          <div className="pt-2">
            <button
              className={`group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${currentButtonStyle}`}
            >
              <FiShoppingBag className="text-base transition-transform duration-300 group-hover:rotate-12" />
              <span>{buttonText}</span>
              <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Product Image Showcase */}
        <div className="flex items-center justify-center md:justify-end h-full w-full">
          <div className="group relative flex items-center justify-center md:justify-end p-2 sm:p-4 w-full">
            <img
              src={image}
              alt={title}
              className="max-h-[260px] sm:max-h-[340px] md:max-h-[420px] lg:max-h-[460px] w-auto max-w-full object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105"
              style={
                tagColor === 'rose' || tagColor === 'purple'
                  ? {
                      maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSlide;
