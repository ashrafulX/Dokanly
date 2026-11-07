import { useEffect, useState } from "react";
import apiClient from '../../Services/api-client';
import CategoryItems from "./CategoryItems";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        apiClient.get('/categories')
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
                setCategories(data);
            })
            .catch(() => {});
    }, []);

    return (
        <section className="w-full py-8 sm:py-12 bg-white">
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
                
                {/* Header Section */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                            Popular Collections
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            Explore Categories
                        </h2>
                    </div>

                    <a 
                        href="/categories" 
                        className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-600/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
                    >
                        <span>View Categories</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    {categories?.map((category) => (
                        <CategoryItems key={category.id} category={category} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Categories;
