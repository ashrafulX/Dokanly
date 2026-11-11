import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import apiClient from '../Services/api-client';
import { useCart } from '../context/CartContext';
import defaultProductImg from '../assets/default-product.png';
import { 
  FiSearch, 
  FiX, 
  FiShoppingBag, 
  FiCheck, 
  FiChevronLeft, 
  FiChevronRight, 
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination & Filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [addedId, setAddedId] = useState(null);

  // Fetch Categories directly from Backend Database
  useEffect(() => {
    apiClient.get('/categories/')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
        setCategories(data);
      })
      .catch((err) => console.warn('Categories API fetch error', err));
  }, []);

  // Fetch Products from Backend Database
  const fetchProducts = () => {
    setLoading(true);
    setError('');
    const params = { page: currentPage };

    if (selectedCategory !== 'all') {
      const matched = categories.find(
        (c) => c.name.toLowerCase() === selectedCategory.toLowerCase() || String(c.id) === String(selectedCategory)
      );
      if (matched) {
        params.category_id = matched.id;
      }
    }

    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    apiClient.get('/products/', { params })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setTotalCount(res.data.length);
          setTotalPages(1);
        } else if (res.data?.results) {
          setProducts(res.data.results);
          const count = res.data.count || res.data.results.length;
          setTotalCount(count);
          // Backend pagination size is 10
          setTotalPages(Math.max(1, Math.ceil(count / 10)));
        }
      })
      .catch((err) => {
        console.warn('Products API fetch error', err);
        setError('Failed to retrieve products from database. Please retry.');
        setProducts([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, searchQuery, categories]);

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    setCurrentPage(1);
    if (catName === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    setSearchParams(searchParams);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const imageSrc = product.images?.[0]?.image || product.image || defaultProductImg;
    const catName = typeof product.category === 'object' 
      ? product.category?.name 
      : (categories.find(c => c.id === product.category)?.name || 'General');

    addToCart({ ...product, image: imageSrc, categoryName: catName }, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50/60 pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
              <FiShoppingBag className="text-xs" />
              Direct PostgreSQL Database Catalog
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              All Products ({totalCount})
            </h1>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <FiSearch className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search products in database..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-9 py-2.5 bg-white rounded-full border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-2 pb-4 mb-8 overflow-x-auto border-b border-gray-200">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Categories ({totalCount})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name.toLowerCase())}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap capitalize ${
                selectedCategory === cat.name.toLowerCase()
                  ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.name} ({cat.product_count || 10})
            </button>
          ))}
        </div>

        {/* Error Alert with retry */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={fetchProducts}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 cursor-pointer flex items-center gap-1.5"
            >
              <FiRefreshCw className="text-xs" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs animate-pulse flex flex-col justify-between h-[380px]">
                <div className="h-52 bg-gray-100 rounded-xl mb-4 w-full" />
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-full mb-4 flex-grow" />
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="h-6 bg-gray-100 rounded w-16" />
                  <div className="h-8 bg-gray-100 rounded-xl w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center bg-white rounded-3xl border border-gray-100 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
              <FiSearch className="text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Products Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mt-1">
              We couldn't find any products in the database matching "{searchQuery || selectedCategory}".
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setCurrentPage(1); }}
              className="mt-4 px-6 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => {
              // Product image logic: database image if available, else default image from src/assets
              const dbImage = p.images?.[0]?.image || p.image;
              const imageSrc = dbImage || defaultProductImg;
              const price = parseFloat(p.price) || 0;
              const categoryName = typeof p.category === 'object'
                ? p.category?.name
                : (categories.find(c => c.id === p.category)?.name || 'General');

              return (
                <div 
                  key={p.id}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <Link to={`/product/${p.id}`} className="relative h-56 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100 block overflow-hidden">
                    <img 
                      src={imageSrc} 
                      alt={p.name} 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultProductImg;
                      }}
                      className="h-full w-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out" 
                    />
                    <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-full shadow-xs border border-gray-100">
                      <span className="text-red-600 font-black text-xs sm:text-sm">${price.toFixed(2)}</span>
                    </div>
                  </Link>

                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {categoryName}
                    </span>

                    <Link 
                      to={`/product/${p.id}`}
                      className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1"
                    >
                      {p.name}
                    </Link>

                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 flex-grow leading-relaxed">
                      {p.description || "Database product item from Dokanly catalog."}
                    </p>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-medium">Price</span>
                        <span className="text-base font-black text-gray-900">
                          ${price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          addedId === p.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-xs hover:shadow-md hover:shadow-red-600/20 active:scale-95'
                        }`}
                      >
                        {addedId === p.id ? (
                          <>
                            <FiCheck className="text-xs" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <FiShoppingBag className="text-xs" />
                            <span>Add</span>
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <FiChevronLeft className="text-base" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <FiChevronRight className="text-base" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;
