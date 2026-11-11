import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import apiClient from '../../Services/api-client';
import { useCart } from '../../context/CartContext';
import defaultProductImg from '../../assets/default-product.png';
import { FiArrowRight, FiShoppingBag, FiCheck, FiRefreshCw } from 'react-icons/fi';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addToCart } = useCart();
    const [addedId, setAddedId] = useState(null);

    const fetchDatabaseProducts = () => {
        setLoading(true);
        setError('');

        // Fetch categories and products from the PostgreSQL database in parallel
        Promise.allSettled([
            apiClient.get('/categories/'),
            apiClient.get('/products/')
        ]).then(([catRes, prodRes]) => {
            if (catRes.status === 'fulfilled') {
                const catData = Array.isArray(catRes.value.data) ? catRes.value.data : (catRes.value.data?.results || []);
                const map = {};
                catData.forEach(c => { map[c.id] = c.name; });
                setCategories(map);
            }

            if (prodRes.status === 'fulfilled') {
                const prodData = Array.isArray(prodRes.value.data) ? prodRes.value.data : (prodRes.value.data?.results || []);
                setProducts(prodData);
            } else {
                setError('Failed to load live database products. Please check server connection.');
            }
        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchDatabaseProducts();
    }, []);

    const handleAddToCart = (e, prod) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(prod, 1);
        setAddedId(prod.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <section className="w-full py-12 sm:py-16 bg-white border-b border-gray-100">
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">

                {/* Section Header */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold uppercase tracking-wider mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                            Live Database Catalog
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            Trending Products
                        </h2>
                    </div>

                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 transition-colors group cursor-pointer"
                    >
                        <span>View All ({products.length > 0 ? products.length : '40+'}) Products</span>
                        <FiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center justify-between">
                        <span>{error}</span>
                        <button 
                            onClick={fetchDatabaseProducts}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 cursor-pointer"
                        >
                            <FiRefreshCw className="text-xs" />
                            <span>Retry</span>
                        </button>
                    </div>
                )}

                {/* Loading Skeleton */}
                {loading ? (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <div key={n} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs animate-pulse flex flex-col h-[380px]">
                                <div className="h-48 bg-gray-100 rounded-xl mb-4 w-full" />
                                <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                                <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
                                <div className="h-3 bg-gray-100 rounded w-full mb-4 flex-grow" />
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <div className="h-6 bg-gray-100 rounded w-16" />
                                    <div className="h-8 bg-gray-100 rounded-xl w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-16 text-center bg-gray-50 rounded-3xl border border-gray-100 p-8">
                        <FiShoppingBag className="mx-auto text-4xl text-gray-300 mb-3" />
                        <h3 className="text-base font-bold text-gray-800">No products available in the database</h3>
                        <p className="text-xs text-gray-500 mt-1">Please ensure your Django backend is running.</p>
                    </div>
                ) : (
                    /* Products Grid */
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {products.map((product) => {
                            // Check if product has an image in database
                            const dbImage = product.images?.[0]?.image || product.image;
                            const imageSrc = dbImage || defaultProductImg;
                            const price = parseFloat(product.price) || 0;
                            const categoryName = typeof product.category === 'object' 
                                ? product.category?.name 
                                : (categories[product.category] || 'General');

                            return (
                                <div 
                                    key={product.id}
                                    className="group relative flex flex-col w-full h-full bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <Link 
                                        to={`/product/${product.id}`} 
                                        className="relative h-52 sm:h-56 w-full bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100 block overflow-hidden"
                                    >
                                        <img
                                            src={imageSrc}
                                            alt={product.name}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = defaultProductImg;
                                            }}
                                            className="h-full w-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-full shadow-xs border border-gray-100">
                                            <span className="text-red-600 font-extrabold text-xs sm:text-sm">
                                                ${price.toFixed(2)}
                                            </span>
                                        </div>
                                        {product.stock <= 5 && product.stock > 0 && (
                                            <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                                                Only {product.stock} left
                                            </div>
                                        )}
                                    </Link>

                                    <div className="flex flex-col flex-grow p-4 sm:p-5 w-full">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                            {categoryName}
                                        </span>

                                        <Link 
                                            to={`/product/${product.id}`}
                                            className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-1"
                                        >
                                            {product.name}
                                        </Link>

                                        <p className="mt-1 text-xs text-gray-500 line-clamp-2 flex-grow leading-relaxed">
                                            {product.description || "High quality product from Dokanly database."}
                                        </p>

                                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 w-full">
                                            <div>
                                                <span className="text-[10px] text-gray-400 block font-medium">Price</span>
                                                <span className="text-sm sm:text-base font-black text-gray-900">
                                                    ${price.toFixed(2)}
                                                </span>
                                            </div>

                                            <button 
                                                onClick={(e) => handleAddToCart(e, { ...product, image: imageSrc, categoryName })}
                                                className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                                                    addedId === product.id
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-xs hover:shadow-md hover:shadow-red-600/20 active:scale-95'
                                                }`}
                                            >
                                                {addedId === product.id ? (
                                                    <>
                                                        <FiCheck className="text-xs" />
                                                        <span>Added!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiShoppingBag className="text-xs" />
                                                        <span>Add to Cart</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Product;
