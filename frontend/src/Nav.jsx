import { useEffect, useRef, useState } from "react";

const DROP_ITEMS = [
  {
    label: "All Products",
    href: "#products",
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
    href: "#products",
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
    href: "#products",
    icon: (
      <>
        <path d="M8 28C8 14 18 7 30 7C30 19 22 28 8 28Z" />
        <path d="M8 28C12 22 17 17 24 14" />
      </>
    ),
  },
  {
    label: "Home & Kitchen",
    href: "#products",
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
    href: "#products",
    icon: (
      <>
        <circle cx="18" cy="18" r="14" />
        <path d="M20 7L13 19H19L16 29L24 16H18Z" />
      </>
    ),
  },
];

export default function Nav({ cartCount = 2 }) {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("menu", open);
    return () => document.body.classList.remove("menu");
  }, [open]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

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
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="dokanly-topbar">
        <div className="dokanly-topbar-inner">
          <div className="dokanly-topbar-left">
            <span className="deal-badge">HOT DEAL</span>
            <span>Get 20% OFF on your first order with code <strong>DOKANLY20</strong></span>
          </div>
          <div className="dokanly-topbar-right">
            <span>🚚 Free Delivery Over $50</span>
            <span>•</span>
            <span>📞 24/7 Support: +880 1800-DOKANLY</span>
          </div>
        </div>
      </div>

      {/* Main Dokanly Floating Navbar */}
      <nav id="nav">
        
        {/* Left: Mobile Hamburger + Brand Logo */}
        <div className="nav-left-group">
          {/* Hamburger button for phone / mobile */}
          <button 
            className="mobile-hamburger-btn" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Dokanly Logo */}
          <a className="logo dokanly-logo" href="#">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="logo-text">
              <span className="brand-name">Dokan<span className="brand-accent">ly</span></span>
              <span className="brand-sub">Smart E-Commerce</span>
            </div>
          </a>
        </div>

        {/* Center Desktop Navigation */}
        <div id="links">
          <a href="#">Home</a>
          
          <a
            className="shop"
            href="#products"
            onMouseEnter={openNow}
            onMouseLeave={closeSoon}
            onClick={(e) => {
              e.preventDefault();
              clearTimeout(timer.current);
              setOpen((o) => !o);
            }}
          >
            <span>Shop</span>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1.5 3.5L5 7L8.5 3.5" />
            </svg>
          </a>

          <a href="#categories">Categories</a>
          <a href="#deals" className="deals-link">
            <span>Deals</span>
            <span className="sale-tag">Sale</span>
          </a>
          <a href="#about">About</a>
        </div>

        {/* Right Actions: Search, Cart, Sign In */}
        <div className="nav-actions">
          {/* Search Trigger Button */}
          <button 
            id="search" 
            aria-label="Search products"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="8.5" cy="8.5" r="6" />
              <line x1="13" y1="13" x2="18" y2="18" />
            </svg>
          </button>

          {/* Cart Icon with Live Badge */}
          <a href="#cart" className="cart-btn" aria-label="Shopping Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </a>

          {/* Sign In Button */}
          <a href="#login" className="nav-signin-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="user-icon">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Sign In</span>
          </a>
        </div>

      </nav>

      {/* Quick Search Overlay Bar */}
      {searchOpen && (
        <div className="search-overlay-bar">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="search-form-icon">
              <circle cx="8.5" cy="8.5" r="6" />
              <line x1="13" y1="13" x2="18" y2="18" />
            </svg>
            <input
              type="text"
              autoFocus
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit-btn">Search</button>
            <button type="button" className="search-close-btn" onClick={() => setSearchOpen(false)}>✕</button>
          </form>
        </div>
      )}

      {/* Interactive Dropdown Categories Menu (Desktop) */}
      <div id="drop" onMouseEnter={openNow} onMouseLeave={closeSoon}>
        {DROP_ITEMS.map((it) => (
          <a key={it.label} href={it.href} onClick={() => setOpen(false)}>
            <svg viewBox="0 0 36 36">{it.icon}</svg>
            <span>{it.label}</span>
          </a>
        ))}
      </div>

      {/* Full Mobile Slide-in Drawer Navigation (Phone view) */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            
            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="logo dokanly-logo">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <div className="logo-text">
                  <span className="brand-name">Dokan<span className="brand-accent">ly</span></span>
                  <span className="brand-sub">Smart E-Commerce</span>
                </div>
              </div>

              <button className="drawer-close-btn" onClick={() => setMobileMenuOpen(false)}>
                ✕
              </button>
            </div>

            {/* User Greeting & Sign In */}
            <div className="drawer-user-card">
              <div className="drawer-user-info">
                <div className="drawer-avatar">👤</div>
                <div>
                  <p className="drawer-greeting">Welcome to Dokanly!</p>
                  <p className="drawer-subtext">Sign in to track orders & view deals</p>
                </div>
              </div>
              <div className="drawer-auth-buttons">
                <a href="#login" className="btn-signin" onClick={() => setMobileMenuOpen(false)}>Sign In</a>
                <a href="#register" className="btn-register" onClick={() => setMobileMenuOpen(false)}>Register</a>
              </div>
            </div>

            {/* Search Input in Mobile Drawer */}
            <div className="drawer-search">
              <form onSubmit={handleSearchSubmit}>
                <input 
                  type="text" 
                  placeholder="Search products, brands..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Go</button>
              </form>
            </div>

            {/* Navigation Links List */}
            <div className="drawer-links-list">
              <a href="#" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span className="drawer-link-icon">🏠</span>
                <span>Home</span>
              </a>

              <a href="#products" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span className="drawer-link-icon">🛍️</span>
                <span>Shop All Products</span>
              </a>

              {/* Categories Section */}
              <div className="drawer-category-group">
                <div className="drawer-group-title">
                  <span>Categories</span>
                </div>
                <a href="#products" className="drawer-sublink" onClick={() => setMobileMenuOpen(false)}>
                  ⚡ Electronics & Gadgets
                </a>
                <a href="#products" className="drawer-sublink" onClick={() => setMobileMenuOpen(false)}>
                  👗 Men & Women Fashion
                </a>
                <a href="#products" className="drawer-sublink" onClick={() => setMobileMenuOpen(false)}>
                  🏠 Home & Kitchenware
                </a>
                <a href="#products" className="drawer-sublink" onClick={() => setMobileMenuOpen(false)}>
                  📚 Books & Stationery
                </a>
              </div>

              <a href="#deals" className="drawer-link drawer-deal-link" onClick={() => setMobileMenuOpen(false)}>
                <span className="drawer-link-icon">🔥</span>
                <span>Hot Deals & Discounts</span>
                <span className="badge-hot">50% OFF</span>
              </a>

              <a href="#cart" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span className="drawer-link-icon">🛒</span>
                <span>My Cart ({cartCount})</span>
              </a>

              <a href="#orders" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span className="drawer-link-icon">📦</span>
                <span>My Orders</span>
              </a>

              <a href="#about" className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <span className="drawer-link-icon">ℹ️</span>
                <span>About Dokanly</span>
              </a>
            </div>

            {/* Drawer Footer */}
            <div className="drawer-footer">
              <p>📞 Helpline: +880 1800-DOKANLY</p>
              <p>© 2026 Dokanly Inc. All rights reserved.</p>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar (App Experience on Phone) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
        <a href="#" className="bottom-nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </a>

        <a href="#products" className="bottom-nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span>Shop</span>
        </a>

        <button className="bottom-nav-item" onClick={() => setMobileMenuOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span>Categories</span>
        </button>

        <a href="#cart" className="bottom-nav-item cart-item">
          <div className="bottom-cart-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="bottom-badge">{cartCount}</span>}
          </div>
          <span>Cart</span>
        </a>

        <a href="#login" className="bottom-nav-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Account</span>
        </a>
      </nav>
    </>
  );
}
