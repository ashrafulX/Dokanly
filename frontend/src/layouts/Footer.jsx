import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-base-100 border-t border-base-200/80 text-base-content">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                
                {/* Top Section: Brand, Links & Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-base-200/80">
                    
                    {/* Brand Info (Spans 4 columns on large screens) */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none w-fit">
                            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-content font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                                D
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text">
                                Dokanly<span className="text-primary font-light"></span>
                            </span>
                        </Link>
                        <p className="text-sm text-base-content/70 leading-relaxed max-w-sm">
                            Crafting minimal, modern, and accessible digital experiences. Built for speed, designed for clarity.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex items-center gap-2.5 pt-1">
                            <a
                                href="http://x.com/ashrafultalks"
                                aria-label="Twitter"
                                className="btn btn-ghost btn-sm btn-circle bg-base-200/50 hover:bg-primary hover:text-primary-content transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                            <a
                                href="#youtube"
                                aria-label="YouTube"
                                className="btn btn-ghost btn-sm btn-circle bg-base-200/50 hover:bg-primary hover:text-primary-content transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                </svg>
                            </a>
                            <a
                                href="http://facebook.com/ashrafulwho"
                                aria-label="Facebook"
                                className="btn btn-ghost btn-sm btn-circle bg-base-200/50 hover:bg-primary hover:text-primary-content transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns (Spans 4 columns on large screens, 2 cols on mobile) */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-4">
                        <div>
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-base-content mb-4">
                                Services
                            </h6>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link to="/branding" className="text-base-content/70 hover:text-primary transition-colors">
                                        Branding
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/design" className="text-base-content/70 hover:text-primary transition-colors">
                                        Design Systems
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/marketing" className="text-base-content/70 hover:text-primary transition-colors">
                                        Marketing
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/advertisement" className="text-base-content/70 hover:text-primary transition-colors">
                                        Advertisement
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-base-content mb-4">
                                Company
                            </h6>
                            <ul className="space-y-2.5 text-sm">
                                <li>
                                    <Link to="/about" className="text-base-content/70 hover:text-primary transition-colors">
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-base-content/70 hover:text-primary transition-colors">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2">
                                        Careers
                                        <span className="badge badge-xs badge-primary py-2 font-medium">Hiring</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/press" className="text-base-content/70 hover:text-primary transition-colors">
                                        Press kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Callout (Spans 4 columns on large screens) */}
                    <div className="lg:col-span-4 space-y-3">
                        <h6 className="text-xs font-semibold uppercase tracking-wider text-base-content">
                            Stay Updated
                        </h6>
                        <p className="text-sm text-base-content/70">
                            Subscribe to our newsletter for the latest product updates, minimal gear drops, and exclusive discounts.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="pt-1">
                            <div className="join w-full max-w-md">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    className="input input-sm sm:input-md input-bordered join-item w-full bg-base-200/40 focus:bg-base-100 focus:outline-none focus:border-primary text-sm"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-sm sm:btn-md btn-primary join-item px-5 font-medium"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Legal Links */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-base-content/60">
                    <p>© {new Date().getFullYear()} daisyUI Inc. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/privacy" className="hover:text-base-content transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-base-content transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/cookies" className="hover:text-base-content transition-colors">
                            Cookie Settings
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;