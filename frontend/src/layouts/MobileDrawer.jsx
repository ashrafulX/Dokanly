import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  FiX, 
  FiHome, 
  FiShoppingBag, 
  FiGrid, 
  FiTag, 
  FiPackage, 
  FiShoppingCart, 
  FiSearch, 
  FiChevronDown, 
  FiChevronRight, 
  FiLogOut, 
  FiUser,
  FiPhoneCall,
  FiShield
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const MobileDrawer = ({ isOpen, onClose, categories = [] }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const { user, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden transform transition-transform duration-300">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-xs">
              <FiShoppingBag className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-gray-900 text-lg leading-tight">
                Dokan<span className="text-red-600">ly</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                Smart E-Commerce
              </span>
            </div>
          </Link>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100/50">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center shadow-xs text-sm">
                  {user.first_name ? user.first_name[0] : (user.email ? user.email[0].toUpperCase() : 'U')}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 font-medium">Logged in as</p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user.first_name || user.email?.split('@')[0]}
                  </p>
                </div>
              </div>

              <button
                onClick={() => { logout(); onClose(); }}
                className="p-2 text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Sign Out"
              >
                <FiLogOut className="text-base" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <FiUser className="text-red-600" />
                <span>Welcome! Sign in for orders & deals.</span>
              </div>
              <div className="flex gap-2 mt-1">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-xs transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input 
              type="text"
              placeholder="Search products, brands, deals..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
          </form>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50/60 font-semibold text-xs sm:text-sm transition-all"
          >
            <FiHome className="text-base text-gray-400" />
            <span>Home</span>
          </Link>

          <Link
            to="/shop"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50/60 font-semibold text-xs sm:text-sm transition-all"
          >
            <FiShoppingBag className="text-base text-gray-400" />
            <span>Shop All Products</span>
          </Link>

          {/* Categories Accordion */}
          <div className="rounded-xl overflow-hidden">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50/60 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FiGrid className="text-base text-gray-400" />
                <span>Product Categories</span>
              </div>
              <FiChevronDown 
                className={`text-sm text-gray-400 transition-transform duration-200 ${
                  categoriesOpen ? 'rotate-180 text-red-600' : ''
                }`} 
              />
            </button>

            {categoriesOpen && (
              <div className="pl-9 pr-3 py-1 space-y-1 bg-gray-50/60 rounded-xl my-1">
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 text-xs text-gray-600 hover:text-red-600 font-medium"
                >
                  <span>All Categories</span>
                  <FiChevronRight className="text-xs text-gray-300" />
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${encodeURIComponent(cat.name?.toLowerCase())}`}
                    onClick={onClose}
                    className="flex items-center justify-between py-1.5 text-xs text-gray-600 hover:text-red-600 font-medium capitalize"
                  >
                    <span>{cat.name}</span>
                    <FiChevronRight className="text-xs text-gray-300" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/shop?filter=deals"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50/60 font-semibold text-xs sm:text-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <FiTag className="text-base text-red-500" />
              <span>Hot Deals & Discounts</span>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
              HOT
            </span>
          </Link>

          {user && (
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50/60 font-semibold text-xs sm:text-sm transition-all"
            >
              <FiUser className="text-base text-gray-400" />
              <span>Customer Dashboard</span>
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin-dashboard"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 bg-red-50/80 font-bold text-xs sm:text-sm transition-all"
            >
              <FiShield className="text-base" />
              <span>Admin Console</span>
            </Link>
          )}

          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50/60 font-semibold text-xs sm:text-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <FiShoppingCart className="text-base text-gray-400" />
              <span>My Cart</span>
            </div>
            {cartCount > 0 && (
              <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                {cartCount} items
              </span>
            )}
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 text-[11px] text-gray-400 space-y-1">
          <p className="flex items-center gap-1.5 text-gray-600 font-semibold">
            <FiPhoneCall className="text-red-600 text-xs" />
            <span>Helpline: +880 1800-DOKANLY</span>
          </p>
          <p>© 2026 Dokanly Inc. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default MobileDrawer;
