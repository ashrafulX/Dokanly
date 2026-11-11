import { useEffect, useMemo, useRef, useState } from "react";
import Nav from "./Nav.jsx";
import useOllaScroll from "./useOllaScroll.js";
import { SKY, BALLOONS, KITCHEN, POTS_CLIP } from "./assets.js";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Ultra-Fast Wireless ANC Headphones",
    category: "Electronics",
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    badge: "25% OFF"
  },
  {
    id: 2,
    name: "Minimalist Smart Watch Series 8",
    category: "Gadgets",
    price: 149.00,
    oldPrice: 199.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    badge: "BESTSELLER"
  },
  {
    id: 3,
    name: "Ergonomic Comfort Office Backpack",
    category: "Fashion",
    price: 49.50,
    oldPrice: 65.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    badge: "NEW"
  },
  {
    id: 4,
    name: "Premium Stainless Coffee Tumbler",
    category: "Home & Living",
    price: 24.99,
    oldPrice: 35.00,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80",
    badge: "POPULAR"
  }
];

export default function App() {
  const sky = useRef(null);
  const kitchen = useRef(null);
  const ktext = useRef(null);
  const balloons = useRef(null);
  const gS = useRef(null);
  const gK = useRef(null);
  const card = useRef(null);
  const pots = useRef(null);

  const [cartCount, setCartCount] = useState(2);
  const [addedId, setAddedId] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  const refs = useMemo(() => ({ sky, kitchen, ktext, balloons, gS, gK }), []);
  useOllaScroll(refs);

  // Flash Sale Timer
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Pots video: autoplay loop + sample colour
  useEffect(() => {
    const v = pots.current;
    if (!v) return;
    v.muted = true;
    v.crossOrigin = "anonymous";
    const sample = () => {
      try {
        const c = document.createElement("canvas");
        c.width = c.height = 8;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(v, 0, 0, v.videoWidth * 0.12, v.videoHeight * 0.12, 0, 0, 8, 8);
        const d = ctx.getImageData(0, 0, 8, 8).data;
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; }
        if (card.current) {
          card.current.style.background = `rgb(${Math.trunc(r / 64)}, ${Math.trunc(g / 64)}, ${Math.trunc(b / 64)})`;
        }
      } catch (e) { /* keep fallback yellow */ }
    };
    v.addEventListener("loadeddata", sample, { once: true });
    v.src = POTS_CLIP;
    v.play().catch(() => {});
    return () => v.removeEventListener("loadeddata", sample);
  }, []);

  const handleAddToCart = (id) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="dokanly-app">
      {/* Navigation with Announcement, Desktop Dropdown, and Mobile Drawer/Bottom Nav */}
      <Nav cartCount={cartCount} />

      {/* Hero Section: 3D Interactive Dokanly E-Commerce Hero */}
      <section id="hero">
        <div id="sky" ref={sky} style={{ backgroundImage: `url("${SKY}")` }}>
          <div className="tag">
            <span className="hero-mini-tag">★ RAMADAN / SPRING MEGA DROP</span>
            Smart Deals<sup>2026</sup>
            <br />
            Curated Collections
          </div>
          <div id="balloons" ref={balloons} style={{ backgroundImage: `url("${BALLOONS}")` }} />
          <canvas className="grill" id="gS" ref={gS} />
          
          {/* Dokanly Animated Watermark (Replaced "olla") */}
          <div className="word" style={{ fontSize: 'clamp(2.8rem, 11vw, 13rem)', bottom: '4%' }}>
            Dokanly
          </div>
        </div>

        {/* Right Interactive E-Commerce Spotlight Card */}
        <aside id="card" ref={card}>
          <div className="card-top-badge">
            <span className="new">HOT DROP</span>
            <span className="card-sub-tag">Up to 40% OFF</span>
          </div>

          <p>
            Say hello to smart shopping.
            <br />
            Discover <strong>Dokanly</strong><sup>™</sup>
            <br />
            modern collections.
          </p>

          <video id="pots" ref={pots} muted loop playsInline autoPlay crossOrigin="anonymous" />
          
          <a className="cta" href="#products">
            Explore Shop Now →
          </a>
        </aside>
      </section>

      {/* Trust Feature Badges */}
      <section className="dokanly-trust-features">
        <div className="trust-features-grid">
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <div className="feature-info">
              <h4>Free & Fast Delivery</h4>
              <p>On all orders above $50 across Bangladesh</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <div className="feature-info">
              <h4>100% Authentic</h4>
              <p>Direct from verified global brands</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💳</div>
            <div className="feature-info">
              <h4>Secure Payments</h4>
              <p>bKash, Nagad, Cards & Cash on Delivery</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔄</div>
            <div className="feature-info">
              <h4>7 Days Return</h4>
              <p>Hassle-free replacement guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Interactive Stage: Lifestyle Showcase */}
      <section id="kitchen" ref={kitchen} style={{ backgroundImage: `url("${KITCHEN}")` }}>
        <canvas className="grill" id="gK" ref={gK} />
        <div id="ktext" ref={ktext}>
          <span className="ktext-tag">✨ VERIFIED QUALITY GUARANTEED</span>
          <h2>Curated For Modern Living. Delivered To Your Door.</h2>
          <p>
            Discover thousands of handpicked electronics, premium fashion, kitchenware,
            <br />
            and smart accessories with lightning-fast delivery.
          </p>
          <div className="ktext-actions">
            <a href="#products" className="ktext-btn primary">Shop All Products</a>
            <a href="#deals" className="ktext-btn secondary">View Flash Deals</a>
          </div>
        </div>
      </section>

      {/* Flash Sale Banner with Live Countdown Timer */}
      <section id="deals" className="flash-deals-section">
        <div className="flash-deals-card">
          <div className="flash-deals-content">
            <span className="flash-badge">⚡ LIMITED TIME OFFER</span>
            <h2>Super Spring Deals: Up to 50% Off!</h2>
            <p>Save big on top electronics, smart accessories, and fashionable essentials before the timer runs out.</p>
            
            <div className="flash-coupon">
              <span>Use Coupon:</span>
              <strong className="coupon-code">DOKANLY20</strong>
            </div>
          </div>

          <div className="flash-timer-box">
            <span className="timer-title">Deal Expires In:</span>
            <div className="timer-digits">
              <div className="timer-digit-card">
                <span className="digit-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="digit-label">Hours</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-digit-card">
                <span className="digit-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="digit-label">Mins</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-digit-card">
                <span className="digit-num red">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="digit-label">Secs</span>
              </div>
            </div>
            <a href="#products" className="flash-shop-btn">Claim Deal & Shop →</a>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section id="categories" className="categories-showcase">
        <div className="section-head">
          <div>
            <span className="section-sub">TOP COLLECTIONS</span>
            <h2 className="section-title">Explore Categories</h2>
          </div>
          <a href="#products" className="view-all-link">View All Categories →</a>
        </div>

        <div className="categories-grid">
          {[
            { name: "Electronics & Tech", count: "120+ Items", icon: "⚡", bg: "#eff6ff", color: "#1d4ed8" },
            { name: "Fashion & Apparel", count: "350+ Items", icon: "👗", bg: "#fdf2f8", color: "#db2777" },
            { name: "Home & Kitchen", count: "85+ Items", icon: "🏠", bg: "#fefce8", color: "#ca8a04" },
            { name: "Books & Lifestyle", count: "90+ Items", icon: "📚", bg: "#f0fdf4", color: "#16a34a" },
          ].map((c) => (
            <a href="#products" key={c.name} className="cat-card" style={{ backgroundColor: c.bg }}>
              <div className="cat-icon-circle" style={{ color: c.color }}>{c.icon}</div>
              <h3>{c.name}</h3>
              <p>{c.count}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Trending & Featured Products Grid */}
      <section id="products" className="products-showcase">
        <div className="section-head">
          <div>
            <span className="section-sub">HOT RIGHT NOW</span>
            <h2 className="section-title">Trending Products</h2>
          </div>
          <a href="#products" className="view-all-link">Browse Full Shop →</a>
        </div>

        <div className="products-grid">
          {FEATURED_PRODUCTS.map((prod) => (
            <div key={prod.id} className="product-card">
              <div className="prod-img-box">
                <img src={prod.image} alt={prod.name} loading="lazy" />
                <span className="prod-badge">{prod.badge}</span>
                <span className="prod-fav">❤️</span>
              </div>

              <div className="prod-details">
                <span className="prod-cat">{prod.category}</span>
                <h4 className="prod-title">{prod.name}</h4>
                <div className="prod-rating">
                  {"★".repeat(Math.floor(prod.rating))}
                  <span className="rating-num">({prod.rating})</span>
                </div>

                <div className="prod-bottom">
                  <div className="price-box">
                    <span className="current-price">${prod.price}</span>
                    <span className="old-price">${prod.oldPrice}</span>
                  </div>

                  <button 
                    className={`add-cart-btn ${addedId === prod.id ? 'added' : ''}`}
                    onClick={() => handleAddToCart(prod.id)}
                  >
                    {addedId === prod.id ? "✓ Added!" : "+ Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full E-Commerce Footer */}
      <footer id="about" className="dokanly-footer">
        <div className="footer-container">
          <div className="footer-col brand-col">
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
            <p className="footer-desc">
              Bangladesh's premier online destination for authentic gadgets, fashion, and lifestyle essentials.
            </p>
            <div className="footer-contact">
              <p>📞 +880 1800-DOKANLY</p>
              <p>✉️ support@dokanly.com</p>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#products">Shop All Products</a></li>
              <li><a href="#categories">Browse Categories</a></li>
              <li><a href="#deals">Flash Deals & Discounts</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#orders">Track Order</a></li>
              <li><a href="#cart">Shopping Cart</a></li>
              <li><a href="#login">Account Sign In</a></li>
              <li><a href="#">7-Day Free Returns</a></li>
            </ul>
          </div>

          <div className="footer-col payment-col">
            <h4>Accepted Payments</h4>
            <div className="payment-badges">
              <span>bKash</span>
              <span>Nagad</span>
              <span>VISA</span>
              <span>Mastercard</span>
              <span>Cash on Delivery</span>
            </div>
            <p className="safe-checkout">🔒 100% Encrypted & Safe Checkout</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dokanly Inc. All rights reserved.</p>
          <p>Powered by Dokanly Smart Interactive Engine</p>
        </div>
      </footer>
    </div>
  );
}
