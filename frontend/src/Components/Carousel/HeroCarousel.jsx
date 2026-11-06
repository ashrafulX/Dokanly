import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import CarouselSlide from './CarouselSlide';

// Import Swiper core and modules styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Images from assets folder
import bookImg from '../../assets/image/book.png';
import techImg from '../../assets/image/technology.png';
import fashionImg from '../../assets/image/fashion.png';

import bgBooks from '../../assets/image/carousel-bg-books.jpg';
import bgTech from '../../assets/image/carousel-bg-tech.jpg';
import bgFashion from '../../assets/image/carousel-bg-fashion.jpg';

// Responsive Navigation Buttons
const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute inset-y-0 inset-x-2 sm:inset-x-4 md:inset-x-8 z-20 pointer-events-none flex items-center justify-between">
      <button
        onClick={() => swiper.slidePrev()}
        className="pointer-events-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 border border-gray-200/80 shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Previous Slide"
      >
        <FiChevronLeft className="text-lg sm:text-xl" />
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className="pointer-events-auto w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-red-600 border border-gray-200/80 shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Next Slide"
      >
        <FiChevronRight className="text-lg sm:text-xl" />
      </button>
    </div>
  );
};

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      badge: 'Bestselling Literature',
      title: 'Over the Siren Book Collections',
      subtitle: 'Discover timeless stories, knowledge & inspiration. Find yours!',
      image: bookImg,
      bgImage: bgBooks,
      buttonText: 'Shop Now',
    },
    {
      id: 2,
      badge: 'Latest Gadgets & Tech',
      title: 'Next-Gen Smart Devices & Audio',
      subtitle: 'Upgrade your daily lifestyle with cutting-edge electronics & audio.',
      image: techImg,
      bgImage: bgTech,
      buttonText: 'Shop Now',
    },
    {
      id: 3,
      badge: 'Trending Styles',
      title: 'Trendy Fashion for Everyone',
      subtitle: 'Stay stylish with curated clothing, premium footwear & modern gear.',
      image: fashionImg,
      bgImage: bgFashion,
      buttonText: 'Shop Now',
    },
  ];

  return (
    <div 
      className="relative w-full overflow-hidden bg-white border-b border-gray-100"
      style={{
        '--swiper-theme-color': '#dc2626',
        '--swiper-pagination-bullet-inactive-color': '#9ca3af',
        '--swiper-pagination-bullet-inactive-opacity': '0.4',
      }}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        speed={600}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full !pb-5 sm:!pb-6"
      >
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;