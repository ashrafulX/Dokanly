import React, { useEffect, useState } from 'react';
import Productitem from './Productitem';

import { Navigation, Autoplay } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import ErrorAlert from '../ErrorAlert';
import apiClient from '../Services/api-client';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        apiClient.get('/products')
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
                setProducts(data);
            })
            .catch((err) => {
                setError(err.response?.data?.message || err.message || 'Failed to load products');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="w-full py-8 sm:py-12 bg-white">
            
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">

                {/* Section Header */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                            Hot Right Now
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            Trending Products
                        </h2>
                    </div>

                    <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                        <span>View All Products</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                {/* Error */}
                {error && <ErrorAlert error={error} />}

                {/* Loading Skeleton */}
                {loading ? (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-xs animate-pulse">
                                <div className="h-48 bg-gray-100 rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-100 rounded w-full mb-4"></div>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <div className="h-5 bg-gray-100 rounded w-16"></div>
                                    <div className="h-8 bg-gray-100 rounded-lg w-20"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Products Carousel */
                    <div className="relative w-full min-w-0">
                        {products && products.length > 0 ? (
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                navigation
                                loop={products.length > 4}
                                speed={600}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 16,
                                    },
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 24,
                                    },
                                    1280: {
                                        slidesPerView: 4,
                                        spaceBetween: 24,
                                    },
                                }}
                                className="w-full !pb-8 !pt-1 [&_.swiper-button-next]:!top-[40%] [&_.swiper-button-prev]:!top-[40%] [&_.swiper-button-next]:!w-9 [&_.swiper-button-prev]:!w-9 [&_.swiper-button-next]:!h-9 [&_.swiper-button-prev]:!h-9 [&_.swiper-button-next]:bg-white [&_.swiper-button-prev]:bg-white [&_.swiper-button-next]:text-gray-700 [&_.swiper-button-prev]:text-gray-700 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:shadow-md [&_.swiper-button-prev]:shadow-md [&_.swiper-button-next]:border [&_.swiper-button-prev]:border [&_.swiper-button-next]:border-gray-200 [&_.swiper-button-prev]:border-gray-200 [&_.swiper-button-next:after]:!text-xs [&_.swiper-button-prev:after]:!text-xs hover:[&_.swiper-button-next]:text-red-600 hover:[&_.swiper-button-prev]:text-red-600 hover:[&_.swiper-button-next]:border-red-600 hover:[&_.swiper-button-prev]:border-red-600"
                            >
                                {products.map((product) => (
                                    <SwiperSlide key={product.id} className="w-full !h-auto flex">
                                        <Productitem product={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-gray-500 font-medium">No products available at the moment.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Product;
