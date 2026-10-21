import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-base-100 text-base-content overflow-hidden border-t border-base-200/60">
            {/* Top Glowing Gradient Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
                
                {/* Top Section: Brand, Links & Newsletter */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-base-200/80">
                    
                    {/* Brand Info (Spans 4 columns on large screens) */}
                    <div className="lg:col-span-4 space-y-5">
                        <Link to="/" className="flex items-center gap-3 group focus:outline-none w-fit">
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-content font-bold text-xl shadow-md shadow-primary/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                                D
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-base-100 rounded-full flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                                </span>
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-base-content via-base-content to-base-content/60 bg-clip-text text-transparent">
                                Dokanly<span className="text-primary">.</span>
                            </span>
                        </Link>

                        <p className="text-sm text-base-content/70 leading-relaxed max-w-sm">
                            Crafting minimal, modern, and accessible digital experiences. Built for speed, designed for clarity.
                        </p>
                        
                        {/* Social Icons with Lift & Glow */}
                        <div className="flex items-center gap-3 pt-1">
                            <a
                                href="http://x.com/ashrafultalks"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter)"
                                className="btn btn-ghost btn-sm btn-circle bg-base-200/60 border border-base-300/50 hover:bg-primary hover:text-primary-content hover:border-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/ashrafulX"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="btn btn-ghost btn-sm btn-circle bg-base-200/60 border border-base-300/50 hover:bg-primary hover:text-primary-content hover:border-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M12 .297a12 12 0 0 0-3.797 23.385c.6.113.82-.258.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.623-5.475 5.92.43.372.815 1.103.815 2.222v3.293c0 .32.216.694.825.576A12 12 0 0 0 12 .297Z" />
                                </svg>
                            </a>
                            <a
                                href="http://facebook.com/ashrafulwho"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="btn btn-ghost btn-sm btn-circle bg-base-200/60 border border-base-300/50 hover:bg-primary hover:text-primary-content hover:border-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns (Spans 4 columns on large screens) */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-4">
                        <div>
                            <h6 className="text-xs font-bold uppercase tracking-widest text-base-content/90 mb-5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Services
                            </h6>
                            <ul className="space-y-3 text-sm">
                                {[
                                    { name: 'Branding', path: '/branding' },
                                    { name: 'Design Systems', path: '/design' },
                                    { name: 'Marketing', path: '/marketing' },
                                    { name: 'Advertisement', path: '/advertisement' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className="group inline-flex items-center text-base-content/70 hover:text-primary transition-colors duration-200"
                                        >
                                            <span className="w-0 group-hover:w-2 h-[1.5px] bg-primary mr-0 group-hover:mr-2 transition-all duration-200 rounded-full" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h6 className="text-xs font-bold uppercase tracking-widest text-base-content/90 mb-5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Company
                            </h6>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/about" className="group inline-flex items-center text-base-content/70 hover:text-primary transition-colors duration-200">
                                        <span className="w-0 group-hover:w-2 h-[1.5px] bg-primary mr-0 group-hover:mr-2 transition-all duration-200 rounded-full" />
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="group inline-flex items-center text-base-content/70 hover:text-primary transition-colors duration-200">
                                        <span className="w-0 group-hover:w-2 h-[1.5px] bg-primary mr-0 group-hover:mr-2 transition-all duration-200 rounded-full" />
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="group inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors duration-200">
                                        <span className="w-0 group-hover:w-2 h-[1.5px] bg-primary mr-0 group-hover:mr-2 transition-all duration-200 rounded-full" />
                                        Careers
                                        <span className="badge badge-xs badge-primary badge-outline bg-primary/10 border-primary/30 text-primary px-2 py-2 font-semibold animate-pulse">
                                            Hiring
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/press" className="group inline-flex items-center text-base-content/70 hover:text-primary transition-colors duration-200">
                                        <span className="w-0 group-hover:w-2 h-[1.5px] bg-primary mr-0 group-hover:mr-2 transition-all duration-200 rounded-full" />
                                        Press kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Callout Card (Spans 4 columns on large screens) */}
                    <div className="lg:col-span-4">
                        <div className="p-6 rounded-2xl bg-base-200/40 backdrop-blur-sm border border-base-300/60 shadow-sm space-y-4 relative overflow-hidden group">
                            <div className="flex items-center justify-between">
                                <h6 className="text-xs font-bold uppercase tracking-widest text-base-content">
                                    Stay Updated
                                </h6>
                                <span className="text-xs text-primary font-medium bg-primary/10 px-2.5 py-0.5 rounded-full">
                                    No spam
                                </span>
                            </div>

                            <p className="text-sm text-base-content/70 leading-relaxed">
                                Subscribe for the latest product updates, minimal gear drops, and exclusive discounts.
                            </p>

                            <form onSubmit={(e) => e.preventDefault()} className="pt-1">
                                <div className="relative flex items-center">
                                    <input
                                        type="email"
                                        placeholder="Enter your email..."
                                        required
                                        className="input input-md w-full pr-28 rounded-xl bg-base-100 border-base-300/80 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition-all"
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-sm btn-primary absolute right-1.5 rounded-lg px-4 font-medium shadow-sm hover:shadow-primary/30 transition-all"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright, Legal Links & Back to Top */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-base-content/60">
                    <p>© {new Date().getFullYear()} <span className="font-semibold text-base-content/80">Dokanly Inc.</span> All rights reserved.</p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link to="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/cookies" className="hover:text-primary transition-colors">
                            Cookie Settings
                        </Link>
                        
                        <button
                            onClick={scrollToTop}
                            aria-label="Scroll to top"
                            className="btn btn-ghost btn-xs btn-circle bg-base-200/70 hover:bg-primary hover:text-primary-content transition-all duration-300 ml-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m18 15-6-6-6 6"/>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;