import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import apiClient from "../Services/api-client";
import MobileDrawer from "./MobileDrawer";
import { 
  FiShoppingCart, 
  FiUser, 
  FiLogOut, 
  FiPackage, 
  FiSearch, 
  FiShoppingBag, 
  FiChevronDown, 
  FiMenu, 
  FiX,
  FiShield
} from "react-icons/fi";

const DEFAULT_DROP_ITEMS = [
  {
    label: "All Products",
    href: "/shop",
    icon: (
      <>
        <rect x="5" y="14" width="26" height="17" rx="2" />
        <path d="M3 14L6 6H30L33 14" />
        <path d="M14 31V22H22V31" />
        <rect x="9" y="18" width="4" height="3" />
      </>
    ),
  },
  {
    label: "Electronics & Tech",
    href: "/shop?category=electronics",
    icon: (
      <>
        <polygon points="18,4 25,8 25,16 18,20 11,16 11,8" />
        <path d="M11 8L18 12L25 8M18 12V20" />
        <path d="M11 20L18 24V32L11 28Z" />
        <path d="M25 20L18 24V32L25 28Z" />
      </>
    ),
  },
  {
    label: "Fashion & Lifestyle",
    href: "/shop?category=fashion",
    icon: (
      <>
        <path d="M8 28C8 14 18 7 30 7C30 19 22 28 8 28Z" />
        <path d="M8 28C12 22 17 17 24 14" />
      </>
    ),
  },
  {
    label: "Home & Kitchen",
    href: "/shop?category=home",
    icon: (
      <>
        <circle cx="11" cy="11" r="3.5" />
        <circle cx="25" cy="11" r="3.5" />
        <circle cx="18" cy="15" r="3" />
        <path d="M5 28C5 22 8 19 11 19C14 19 17 22 17 28" />
        <path d="M19 28C19 22 22 19 25 19C28 19 31 22 31 28" />
        <path d="M13 31C13 27 15 25 18 25C21 25 23 27 23 31" />
      </>
    ),
  },
  {
    label: "Books & Stationery",
    href: "/shop?category=books",
    icon: (
      <>
        <circle cx="18" cy="18" r="14" />
        <path d="M20 7L13 19H19L16 29L24 16H18Z" />
      </>
    ),
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [categories, setCategories] = useState([]);
  
  const timer = useRef(null);
  const searchInputRef = useRef(null);
  const { user, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // Load real backend categories for dynamic dropdown
  useEffect(() => {
    apiClient.get('/categories/')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
        if (data.length > 0) setCategories(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu", open);
    return () => document.body.classList.remove("menu");
  }, [open]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const openNow = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  
  const closeSoon = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 160);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal("");
    }
  };

  return (
    <>
      <nav id="nav" className="shadow-xs border border-gray-100 flex items-center justify-between">
        
        {/* Left Section: Mobile Hamburger + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <FiMenu className="text-xl" />
          </button>

          {/* Dokanly Logo */}
          <Link className="logo flex items-center gap-2 group" to="/">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-xs group-hover:bg-red-700 group-hover:scale-105 transition-all">
              <FiShoppingBag className="text-sm sm:text-base" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-gray-900 text-base sm:text-lg leading-none">
                Dokan<span className="text-red-600">ly</span>
              </span>
              <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold hidden sm:block">
                Smart Shopping
              </span>
            </div>
          </Link>
        </div>

        {/* Center Nav Links (Desktop) */}
        <div id="links" className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-red-600 font-semibold transition-colors">
            Home
          </Link>
          
          {/* Shop with Olla Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={openNow}
            onMouseLeave={closeSoon}
          >
            <Link
              className="shop hover:text-red-600 font-semibold transition-colors flex items-center gap-1"
              to="/shop"
              onClick={() => {
                clearTimeout(timer.current);
                setOpen((o) => !o);
              }}
            >
              <span>Shop</span>
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-2.5 h-2.5">
                <path d="M1.5 3.5L5 7L8.5 3.5" />
              </svg>
            </Link>
          </div>

          <Link to="/shop" className="hover:text-red-600 font-semibold transition-colors">
            Categories
          </Link>

          <Link to="/shop?filter=deals" className="hover:text-red-600 font-semibold transition-colors flex items-center gap-1 text-red-600">
            <span>Deals</span>
            <span className="text-[9px] font-extrabold bg-red-100 text-red-600 px-1.5 py-0.2 rounded-full uppercase">
              Sale
            </span>
          </Link>

          {user && (
            <Link to="/dashboard" className="hover:text-red-600 font-semibold transition-colors">
              Dashboard
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin-dashboard" className="text-red-600 font-extrabold transition-colors flex items-center gap-1">
              <FiShield className="text-xs" />
              <span>Admin</span>
            </Link>
          )}
        </div>

        {/* Right Action Icons & User Auth */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          
          {/* Quick Search Toggle */}
          <button 
            onClick={() => setSearchOpen(!searchOpen)} 
            className="text-gray-700 hover:text-red-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Search products"
          >
            <FiSearch className="text-lg" />
          </button>

          {/* Cart Icon with Live Badge */}
          <Link 
            to="/cart" 
            className="relative text-gray-700 hover:text-red-600 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="View shopping cart"
          >
            <FiShoppingCart className="text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* User Auth Profile or Sign In Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.first_name ? user.first_name[0] : (user.email ? user.email[0].toUpperCase() : 'U')}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">
                  {user.first_name || user.email?.split('@')[0]}
                </span>
                <FiChevronDown className="text-xs" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in"
                  onClick={() => setUserDropdown(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Signed in as</p>
                    <p className="text-xs font-bold text-gray-900 truncate">{user.email}</p>
                  </div>
                  
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <FiUser className="text-sm" />
                    <span>My Dashboard</span>
                  </Link>

                  {isAdmin && (
                    <Link 
                      to="/admin-dashboard" 
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiShield className="text-sm" />
                      <span>Admin Console</span>
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                  >
                    <FiLogOut className="text-sm" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <FiUser className="text-xs" />
              <span className="hidden xs:inline">Sign In</span>
            </Link>
          )}

        </div>
      </nav>

      {/* Quick Search Overlay Dropdown */}
      {searchOpen && (
        <div className="fixed top-[8vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-xl z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <FiSearch className="text-gray-400 text-lg ml-2" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="flex-1 py-2 px-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            {searchVal && (
              <button 
                type="button" 
                onClick={() => setSearchVal("")}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <FiX className="text-sm" />
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <FiX className="text-base" />
            </button>
          </form>
        </div>
      )}

      {/* Olla Interactive Dropdown Categories Menu (Desktop) */}
      <div 
        id="drop" 
        onMouseEnter={openNow} 
        onMouseLeave={closeSoon}
        className="shadow-xl border border-gray-100"
      >
        {(categories.length > 0 ? categories.slice(0, 5) : DEFAULT_DROP_ITEMS).map((it, idx) => {
          const href = it.href || `/shop?category=${encodeURIComponent(it.name?.toLowerCase() || '')}`;
          const label = it.label || it.name;
          const icon = it.icon || DEFAULT_DROP_ITEMS[idx % DEFAULT_DROP_ITEMS.length].icon;

          return (
            <Link key={label} to={href} onClick={() => setOpen(false)}>
              <svg viewBox="0 0 36 36">{icon}</svg>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        categories={categories}
      />
    </>
  );
}
