import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
  FiShoppingBag, 
  FiArrowUp, 
  FiMail, 
  FiPhoneCall, 
  FiMapPin, 
  FiShield, 
  FiCheck,
  FiSend,
  FiGithub,
  FiLinkedin
} from 'react-icons/fi';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <footer className="w-full bg-[#0f172a] text-gray-300 border-t border-slate-800 mt-16 selection:bg-red-600 selection:text-white">
            
            {/* Newsletter Subscription Bar */}
            <div className="w-full bg-[#1e293b]/70 border-b border-slate-800 py-10 px-4 sm:px-8 md:px-12 lg:px-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wider mb-1">
                            <FiMail />
                            <span>Exclusive Newsletter Drops</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            Subscribe to Dokanly & Get 15% Off Your First Order
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">
                            Get VIP notifications on flash sales, new product drops, and promo codes.
                        </p>
                    </div>

                    <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md flex items-center gap-2">
                        <div className="relative flex-1">
                            <FiMail className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-full text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                        >
                            {subscribed ? (
                                <>
                                    <FiCheck className="text-sm" />
                                    <span>Joined!</span>
                                </>
                            ) : (
                                <>
                                    <span>Subscribe</span>
                                    <FiSend className="text-xs" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 pt-14 pb-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
                    
                    {/* Brand Info & Social Links (Matching User's Screenshot Position) */}
                    <div className="lg:col-span-5 space-y-4">
                        <Link to="/" className="inline-flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                                <FiShoppingBag className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-extrabold tracking-tight text-white leading-tight">
                                    Dokan<span className="text-red-500">ly</span>
                                </span>
                                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">
                                    SMART E-COMMERCE
                                </span>
                            </div>
                        </Link>

                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
                            Bangladesh's premier online destination for authentic gadgets, fashion, and lifestyle essentials.
                        </p>

                        <div className="space-y-1.5 text-xs text-gray-300">
                            <div className="flex items-center gap-2">
                                <FiPhoneCall className="text-red-500 text-xs shrink-0" />
                                <span>+880 1800–DOKANLY</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiMail className="text-red-500 text-xs shrink-0" />
                                <span>support@dokanly.com</span>
                            </div>
                        </div>

                        {/* Developer Social Links (Requested by User) */}
                        <div className="pt-2 flex items-center gap-3">
                            <a
                                href="https://github.com/ashrafulx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all hover:scale-105"
                                title="Ashraful Islam on GitHub"
                            >
                                <FiGithub className="text-sm text-white" />
                                <span>ashrafulx</span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/ashrafulx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-[#0077b5] text-gray-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all hover:scale-105"
                                title="Ashraful Islam on LinkedIn"
                            >
                                <FiLinkedin className="text-sm text-[#0a66c2] group-hover:text-white" />
                                <span>ashrafulx</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Navigation Links */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
                        <ul className="space-y-2 text-xs text-gray-400">
                            <li><Link to="/" className="hover:text-red-500 transition-colors">Home Store</Link></li>
                            <li><Link to="/shop" className="hover:text-red-500 transition-colors">All Products</Link></li>
                            <li><Link to="/shop?category=electronics" className="hover:text-red-500 transition-colors">Electronics & Gadgets</Link></li>
                            <li><Link to="/shop?category=fashion" className="hover:text-red-500 transition-colors">Fashion & Apparel</Link></li>
                            <li><Link to="/cart" className="hover:text-red-500 transition-colors">My Cart</Link></li>
                        </ul>
                    </div>

                    {/* Dashboards & Portals */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Account & Portals</h4>
                        <ul className="space-y-2 text-xs text-gray-400">
                            <li><Link to="/dashboard" className="hover:text-red-500 transition-colors">User Dashboard</Link></li>
                            <li><Link to="/admin-dashboard" className="hover:text-red-500 transition-colors">Admin Panel</Link></li>
                            <li><Link to="/login" className="hover:text-red-500 transition-colors">Sign In</Link></li>
                            <li><Link to="/register" className="hover:text-red-500 transition-colors">Create Account</Link></li>
                        </ul>
                    </div>

                    {/* Payment Gateways & Back to Top */}
                    <div className="lg:col-span-2 flex flex-col justify-between items-start lg:items-end gap-6">
                        <button
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 hover:border-red-500 hover:text-white text-xs font-semibold text-gray-400 transition-all cursor-pointer shadow-xs"
                        >
                            <span>Back to Top</span>
                            <FiArrowUp className="text-sm" />
                        </button>

                        <div className="space-y-2 text-left lg:text-right">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Payment Partners</p>
                            <div className="flex flex-wrap gap-1.5 justify-start lg:justify-end text-[10px] font-bold">
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-rose-400 border border-slate-700">bKash</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">Nagad</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">VISA</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-orange-400 border border-slate-700">Mastercard</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
                    <p>© 2026 Dokanly Inc. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Safe 256-Bit SSL Demo Sandbox</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-400">
                            <FiShield className="text-xs" /> 100% Secure Checkout
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
