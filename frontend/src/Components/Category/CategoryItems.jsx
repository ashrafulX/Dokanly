import React from "react";

const CategoryItems = ({ category }) => {
    
    return (
        
        <div className="card bg-white w-full shadow-xs border border-gray-100 p-5 sm:p-6 rounded-2xl hover:border-red-200 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[220px]">
            
            <div>
                {/* Top section: Avatar & Items Badge */}
                <div className="flex justify-between items-center mb-4 sm:mb-5">
                    <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-red-600 text-white rounded-full text-lg sm:text-xl font-bold shadow-sm shadow-red-600/30">
                        {category?.name ? category.name[0] : 'C'}
                    </div>
                    
                    <div className="text-red-600 bg-red-50 font-semibold px-3 py-1 rounded-full text-xs">
                        {category?.product_count ?? 0} Items
                    </div>
                </div>

                {/* Title and description */}
                <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-1 line-clamp-1">
                    {category?.name}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-5 line-clamp-1">
                    Explore All {category?.name} products
                </p>
            </div>

            {/* Red action button */}
            <a 
                href={`/category/${category?.id}`}
                className="mt-auto block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl shadow-xs transition-colors text-sm"
            >
                Explore
            </a>
        </div>
    );
};

export default CategoryItems;
