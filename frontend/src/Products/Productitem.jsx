import React, { useState } from 'react';
import default_img from '../assets/image/default-product.png';

const Productitem = ({ product }) => {
    const [imgSrc, setImgSrc] = useState(
        product?.images?.length > 0 && product.images[0]?.image 
            ? product.images[0].image 
            : default_img
    );

    return (
        <div className="group relative flex flex-col w-full h-full bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-200 overflow-hidden">
            
            {/* Image Container with matching shape */}
            <div className="relative h-52 sm:h-56 w-full bg-gray-50 flex items-center justify-center p-4 overflow-hidden border-b border-gray-100">
                <img
                    src={imgSrc}
                    alt={product.name || "Product"}
                    onError={() => setImgSrc(default_img)}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Floating Price Badge */}
                {product?.price && (
                    <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-full shadow-xs border border-gray-100">
                        <span className="text-red-600 font-bold text-xs sm:text-sm">
                            ${product.price}
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow p-4 sm:p-5 w-full">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-1">
                    {product.name}
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2 flex-grow leading-relaxed">
                    {product.description || "High quality product crafted for everyday use."}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 w-full">
                    <div>
                        <span className="text-[11px] text-gray-400 block font-medium">Price</span>
                        <span className="text-base sm:text-lg font-bold text-gray-900 truncate block">
                            ${product.price}
                        </span>
                    </div>

                    <button className="shrink-0 flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer">
                        <span>Buy Now</span>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Productitem;
