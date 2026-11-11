import React from 'react';
import { NavLink } from 'react-router';
import { FiHome, FiGrid, FiShoppingBag, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const MobileBottomNav = ({ onOpenCategories }) => {
  const { cartCount } = useCart();
  const { user } = useAuth();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-red-600 font-bold scale-105' 
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`
          }
        >
          <FiHome className="text-lg mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </NavLink>

        {/* Shop */}
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-red-600 font-bold scale-105' 
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`
          }
        >
          <FiShoppingBag className="text-lg mb-0.5" />
          <span className="text-[10px] tracking-tight">Shop</span>
        </NavLink>

        {/* Categories Button */}
        <button
          onClick={onOpenCategories}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all duration-200 cursor-pointer"
        >
          <FiGrid className="text-lg mb-0.5" />
          <span className="text-[10px] tracking-tight">Categories</span>
        </button>

        {/* Cart */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-red-600 font-bold scale-105' 
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`
          }
        >
          <div className="relative">
            <FiShoppingCart className="text-lg mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </NavLink>

        {/* Account / Dashboard */}
        <NavLink
          to={user ? "/dashboard" : "/login"}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-red-600 font-bold scale-105' 
                : 'text-gray-500 hover:text-gray-900 font-medium'
            }`
          }
        >
          <FiUser className="text-lg mb-0.5" />
          <span className="text-[10px] tracking-tight">
            {user ? 'Dashboard' : 'Sign In'}
          </span>
        </NavLink>

      </div>
    </nav>
  );
};

export default MobileBottomNav;
