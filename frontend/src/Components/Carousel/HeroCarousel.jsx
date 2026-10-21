import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import CarouselSlide from './CarouselSlide';

// Import Swiper core and modules styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Product Showcase Images
import bookImg from '../../assets/image/book.png';
import techImg from '../../assets/image/technology.png';
import fashionImg from '../../assets/image/fashion.png';

// Completely New Generated Modern Studio Background Images
import bgBooks from '../../assets/image/carousel-bg-books.jpg';
import bgTech from '../../assets/image/carousel-bg-tech.jpg';
import bgFashion from '../../assets/image/carousel-bg-fashion.jpg';

// Interactive Tailwind-styled Navigation Buttons
const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute inset-y-0 inset-x-2 sm:inset-x-6 z-20 pointer-events-none flex items-center justify-between">
      <button
        onClick={() => swiper.slidePrev()}
        className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-950 border border-gray-200/80 shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
        aria-label="Previous Slide"
      >
        <FiChevronLeft className="text-lg sm:text-xl transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="pointer-events-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-950 border border-gray-200/80 shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
        aria-label="Next Slide"
      >
        <FiChevronRight className="text-lg sm:text-xl transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      badge: 'Bestselling Literature',
      title: 'Explore the World of Books',
      subtitle: 'Discover thousands of books across genres. Knowledge, inspiration, and timeless stories at your fingertips.',
      image: bookImg,
      bgImage: bgBooks,
      buttonText: 'Shop Books',
      tagColor: 'amber',
    },
    {
      id: 2,
      badge: 'Latest Gadgets & Tech',
      title: 'Latest Technology & Gadgets',
      subtitle: 'Upgrade your lifestyle with cutting-edge electronics, smart devices, and high-performance accessories.',
      image: techImg,
      bgImage: bgTech,
      buttonText: 'Shop Gadgets',
      tagColor: 'blue',
    },
    {
      id: 3,
      badge: 'Trending Styles',
      title: 'Trendy Fashion for Everyone',
      subtitle: 'Stay stylish with our curated clothing, premium footwear, and modern lifestyle collections.',
      image: fashionImg,
      bgImage: bgFashion,
      buttonText: 'Shop Fashion',
      tagColor: 'rose',
    },
  ];

  return (
    <div 
      className="relative w-full overflow-hidden bg-white"
      style={{
        '--swiper-theme-color': '#e11d48',
        '--swiper-pagination-bullet-inactive-color': '#9ca3af',
        '--swiper-pagination-bullet-inactive-opacity': '0.45',
      }}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        speed={700}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {/* Interactive Tailwind Arrow Controls */}
        <SwiperNavButtons />

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <CarouselSlide
              badge={slide.badge}
              title={slide.title}
              subtitle={slide.subtitle}
              image={slide.image}
              bgImage={slide.bgImage}
              buttonText={slide.buttonText}
              tagColor={slide.tagColor}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
