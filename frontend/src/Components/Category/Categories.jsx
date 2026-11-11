import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import apiClient from '../../Services/api-client';
import { FiArrowRight, FiGrid } from "react-icons/fi";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/categories/')
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
                setCategories(data);
            })
            .catch((err) => console.warn('Categories API error:', err))
            .finally(() => setLoading(false));
    }, []);

    const bgColors = [
      "bg-blue-50 text-blue-700", 
      "bg-rose-50 text-rose-700", 
      "bg-amber-50 text-amber-700", 
      "bg-emerald-50 text-emerald-700", 
      "bg-purple-50 text-purple-700"
    ];

    return (
        <section id="categories" className="w-full py-10 sm:py-14 bg-white border-b border-gray-100">
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
                
                {/* Header Section */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                            Live Departments
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            Explore Categories
                        </h2>
                    </div>

                    <Link 
                        to="/shop" 
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
                    >
                        <span>View All Categories</span>
                        <FiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                </div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 animate-pulse flex flex-col items-center">
                                <div className="w-14 h-14 rounded-2xl bg-gray-200 mb-3" />
                                <div className="h-4 bg-gray-200 rounded w-28 mb-2" />
                                <div className="h-3 bg-gray-200 rounded w-36" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {categories.map((cat, idx) => (
                            <Link
                                key={cat.id || idx}
                                to={`/shop?category=${encodeURIComponent(cat.name?.toLowerCase())}`}
                                className="p-6 rounded-3xl bg-gray-50/70 border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-xs group-hover:scale-110 transition-transform ${bgColors[idx % bgColors.length]}`}>
                                    <FiGrid />
                                </div>
                                <h3 className="text-sm sm:text-base font-extrabold text-gray-900 group-hover:text-red-600 transition-colors capitalize">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                    {cat.description || `${cat.product_count || 10} products available`}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};

export default Categories;
