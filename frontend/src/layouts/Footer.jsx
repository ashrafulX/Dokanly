import React from 'react';
import { Link } from 'react-router';
import { FiShoppingBag, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full bg-white text-gray-700 border-t border-gray-200">
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-14 pb-10">
                
                {/* Top Section: Brand, Links & Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-100">
                    
                    {/* Brand Info */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link to="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
                            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                <FiShoppingBag className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900">
                                Dokan<span className="text-red-600">ly</span>
                            </span>
                        </Link>

                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                            Crafting minimal, modern, and accessible digital experiences. Built for speed, designed for clarity.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex items-center gap-2.5 pt-1">
                            <a
                                href="https://x.com/ashrafultalks"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 flex items-center justify-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/ashrafulX"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 flex items-center justify-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M12 .297a12 12 0 0 0-3.797 23.385c.6.113.82-.258.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.623-5.475 5.92.43.372.815 1.103.815 2.222v3.293c0 .32.216.694.825.576A12 12 0 0 0 12 .297Z" />
                                </svg>
                            </a>
                            <a
                                href="http://facebook.com/ashrafulwho"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 flex items-center justify-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-4">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
                                Services
                            </h4>
                            <ul className="space-y-2.5 text-sm">
                                {[
                                    { name: 'Branding', path: '/branding' },
                                    { name: 'Design Systems', path: '/design' },
                                    { name: 'Marketing', path: '/marketing' },
                                    { name: 'Advertisement', path: '/advertisement' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-500 hover:text-red-600 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
                                Company
                            </h4>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link to="/about" className="text-gray-500 hover:text-red-600 transition-colors">
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-500 hover:text-red-600 transition-colors">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-red-600 transition-colors">
                                        <span>Careers</span>
                                        <span className="badge badge-xs bg-red-50 text-red-600 border border-red-200 px-1.5 py-1 font-semibold">
                                            Hiring
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/press" className="text-gray-500 hover:text-red-600 transition-colors">
                                        Press kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Card */}
                    <div className="lg:col-span-4">
                        <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                                Stay Updated
                            </h4>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Subscribe for the latest product releases, exclusive discounts, and flash sales.
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} className="pt-1">
                                <div className="relative flex items-center">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        className="input input-sm w-full pr-24 rounded-lg bg-white border-gray-200 focus:outline-none focus:border-red-500 text-xs"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none absolute right-1 rounded-md px-3 text-xs font-semibold"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Legal */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} <span className="font-semibold text-gray-700">Dokanly Inc.</span> All rights reserved.</p>
                    
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="hover:text-red-600 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-red-600 transition-colors">
                            Terms of Service
                        </Link>
                        <button
                            onClick={scrollToTop}
                            aria-label="Scroll to top"
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <FiArrowUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;