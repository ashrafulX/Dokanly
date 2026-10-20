import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const navLinkClass = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-base-content/70 hover:text-base-content hover:bg-base-200/50'
        }`;

    const navItems = (
        <>
            <li>
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
            </li>
            <li>
                <details className="group">
                    <summary className="px-4 py-2 rounded-lg text-sm font-medium text-base-content/70 hover:text-base-content hover:bg-base-200/50 transition-all duration-200">
                        Categories
                    </summary>
                    <ul className="p-2 bg-base-100/95 backdrop-blur-md w-48 rounded-xl shadow-lg border border-base-200 z-50 lg:mt-2">
                        <li><NavLink to="/category/electronics" className="rounded-lg text-sm py-2">Electronics</NavLink></li>
                        <li><NavLink to="/category/fashion" className="rounded-lg text-sm py-2">Fashion</NavLink></li>
                    </ul>
                </details>
            </li>
            <li>
                <NavLink to="/deals" className={navLinkClass}>Flash Deals</NavLink>
            </li>
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full bg-base-100/80 backdrop-blur-md border-b border-base-200">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
                
                {/* Start: Mobile Menu & Dokanly Brand */}
                <div className="navbar-start gap-2">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" aria-label="Menu" className="btn btn-ghost btn-circle btn-sm lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-56 p-3 shadow-xl border border-base-200 gap-1">
                            {navItems}
                        </ul>
                    </div>

                    <Link to="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-content font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Dokan<span className="text-primary">ly</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1 items-center">
                        {navItems}
                    </ul>
                </div>

                {/* End: Cart & Avatar */}
                <div className="navbar-end gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-xs badge-primary indicator-item py-2 px-1.5">8</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-64 rounded-2xl shadow-xl border border-base-200">
                            <div className="card-body p-4">
                                <div className="flex justify-between items-center border-b border-base-200 pb-2">
                                    <span className="font-bold text-base">8 Items</span>
                                    <span className="text-xs font-semibold text-primary">Subtotal: $999</span>
                                </div>
                                <div className="card-actions pt-2">
                                    <Link to="/cart" className="btn btn-primary btn-sm btn-block rounded-xl">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-base-200 hover:ring-primary/40 transition-all">
                            <div className="w-9 rounded-full">
                                <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-52 p-2 shadow-xl border border-base-200 gap-1">
                            <li>
                                <Link to="/profile" className="justify-between py-2 rounded-lg">
                                    Profile
                                    <span className="badge badge-xs badge-primary py-2">New</span>
                                </Link>
                            </li>
                            <li><Link to="/settings" className="py-2 rounded-lg">Settings</Link></li>
                            <li><button className="text-error py-2 rounded-lg">Logout</button></li>
                        </ul>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Navbar;