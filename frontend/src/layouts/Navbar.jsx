import React from 'react';
import { Link, NavLink } from 'react-router';
import { 
    FiShoppingBag, 
    FiShoppingCart, 
    FiUser, 
    FiSettings, 
    FiLogOut, 
    FiMenu,
    FiChevronDown 
} from 'react-icons/fi';

const Navbar = () => {
    const navLinkClass = ({ isActive }) =>
        `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive
                ? 'bg-red-50 text-red-600 font-semibold'
                : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
        }`;

    const navItems = (
        <>
            <li>
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
            </li>
            <li className="relative group">
                <details className="group">
                    <summary className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors cursor-pointer list-none flex items-center gap-1">
                        <span>Categories</span>
                        {/* <FiChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-180" /> */}
                    </summary>
                    <ul className="p-2 bg-white w-48 rounded-xl shadow-lg border border-gray-100 z-50 lg:mt-2 space-y-1">
                        <li>
                            <NavLink to="/category/electronics" className={navLinkClass}>
                                Electronics
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/category/fashion" className={navLinkClass}>
                                Fashion
                            </NavLink>
                        </li>
                    </ul>
                </details>
            </li>
            <li>
                <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
            </li>
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
            <div className="navbar w-full px-4 sm:px-8 md:px-12 lg:px-16 h-16">
                
                {/* Brand & Mobile Hamburger */}
                <div className="navbar-start gap-2">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" aria-label="Menu" className="btn btn-ghost btn-circle btn-sm lg:hidden text-gray-700 hover:bg-red-50 hover:text-red-600">
                            <FiMenu className="w-5 h-5" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-xl z-50 mt-3 w-52 p-2 shadow-lg border border-gray-100 gap-1">
                            {navItems}
                        </ul>
                    </div>

                    <Link to="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
                        <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-red-600/30 group-hover:bg-red-700 transition-colors">
                            <FiShoppingBag className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            Dokan<span className="text-red-600">ly</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1 items-center">
                        {navItems}
                    </ul>
                </div>

                {/* Cart & Profile Actions */}
                <div className="navbar-end gap-2">
                    {/* Cart Dropdown */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                            <div className="indicator">
                                <FiShoppingCart className="w-5 h-5" />
                                <span className="badge badge-xs bg-red-600 text-white border-none indicator-item py-1.5 px-1 font-bold">
                                    3
                                </span>
                            </div>
                        </div>
                        <div tabIndex={0} className="card card-compact dropdown-content bg-white z-50 mt-3 w-64 rounded-xl shadow-xl border border-gray-100">
                            <div className="card-body p-4">
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-sm text-gray-900">3 Items</span>
                                    <span className="text-xs font-bold text-red-600">Subtotal: $249.00</span>
                                </div>
                                <div className="card-actions pt-2">
                                    <Link 
                                        to="/cart" 
                                        className="btn btn-sm btn-block bg-red-600 hover:bg-red-700 text-white border-none rounded-lg shadow-sm transition-colors"
                                    >
                                        View Cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-1 ring-gray-200 hover:ring-red-300 transition-all">
                            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 font-bold flex items-center justify-center text-xs">
                                <FiUser className="w-4 h-4" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-xl z-50 mt-3 w-48 p-2 shadow-xl border border-gray-100 gap-1">
                            <li>
                                <Link to="/profile" className="flex items-center gap-2 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 text-xs font-medium">
                                    <FiUser className="w-3.5 h-3.5 text-gray-400" />
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings" className="flex items-center gap-2 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 text-xs font-medium">
                                    <FiSettings className="w-3.5 h-3.5 text-gray-400" />
                                    <span>Settings</span>
                                </Link>
                            </li>
                            <li className="pt-1 border-t border-gray-100">
                                <button className="flex items-center gap-2 text-red-600 hover:bg-red-50 py-2 rounded-lg text-xs font-medium">
                                    <FiLogOut className="w-3.5 h-3.5" />
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Navbar;