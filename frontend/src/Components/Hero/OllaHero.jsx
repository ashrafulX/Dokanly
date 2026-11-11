import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router";
import useOllaScroll from "../../useOllaScroll.js";
import { SKY, BALLOONS, KITCHEN, POTS_CLIP } from "../../assets.js";
import { FiArrowRight, FiShoppingBag, FiTag } from "react-icons/fi";

export default function OllaHero() {
  const sky = useRef(null);
  const kitchen = useRef(null);
  const ktext = useRef(null);
  const balloons = useRef(null);
  const gS = useRef(null);
  const gK = useRef(null);
  const card = useRef(null);
  const pots = useRef(null);

  const refs = useMemo(() => ({ sky, kitchen, ktext, balloons, gS, gK }), []);
  useOllaScroll(refs);

  // Autoplay video loop + sample top-left colour for seamless background blending
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
      } catch {
        /* fallback styling */
      }
    };
    v.addEventListener("loadeddata", sample, { once: true });
    v.src = POTS_CLIP;
    v.play().catch(() => {});
    return () => v.removeEventListener("loadeddata", sample);
  }, []);

  return (
    <>
      <section id="hero">
        <div id="sky" ref={sky} style={{ backgroundImage: `url("${SKY}")` }}>
          {/* E-Commerce Promotional Tag */}
          <div className="tag">
            <span className="text-red-400 font-extrabold tracking-wider uppercase text-[11px] sm:text-xs block mb-1">
              ★ RAMADAN / SPRING MEGA DROP
            </span>
            Smart Deals<sup>2026</sup>
            <br />
            Curated Collections
          </div>

          {/* Interactive Balloon Canvas with Floating Delivery Package */}
          <div id="balloons" ref={balloons} style={{ backgroundImage: `url("${BALLOONS}")` }} />
          <canvas className="grill" id="gS" ref={gS} />

          {/* Giant Dokanly Typography */}
          <div 
            className="word select-none tracking-tight font-black" 
            style={{ 
              fontSize: 'clamp(2.8rem, 11vw, 13rem)', 
              bottom: '4%',
              letterSpacing: '-0.04em'
            }}
          >
            Dokanly
          </div>
        </div>

        {/* Right Interactive E-Commerce Spotlight Card */}
        <aside id="card" ref={card} className="relative flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="new font-extrabold text-red-600">HOT DEAL</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-800 bg-white/70 px-2 py-0.5 rounded-full">
                Up to 40% OFF
              </span>
            </div>

            <p className="font-bold text-gray-950 text-sm sm:text-base leading-snug mt-3">
              Elevate your daily living.
              <br />
              Discover <span className="underline decoration-red-500 decoration-2">Dokanly</span><sup>™</sup>
              <br />
              premium essentials.
            </p>
          </div>

          {/* Video Showcase */}
          <video 
            id="pots" 
            ref={pots} 
            muted 
            loop 
            playsInline 
            autoPlay 
            crossOrigin="anonymous" 
            className="pointer-events-none"
          />

          {/* Call to Action Button */}
          <Link 
            className="cta group flex items-center justify-center gap-1.5 font-bold shadow-md hover:shadow-lg transition-all" 
            to="/shop"
          >
            <span>Explore Shop Now</span>
            <FiArrowRight className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </aside>
      </section>

      {/* Second Interactive Stage: Lifestyle Showcase */}
      <section id="kitchen" ref={kitchen} style={{ backgroundImage: `url("${KITCHEN}")` }}>
        <canvas className="grill" id="gK" ref={gK} />
        <div id="ktext" ref={ktext} className="px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
            <FiShoppingBag className="text-xs" />
            Verified Quality Guaranteed
          </div>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Curated For Modern Living. Delivered To Your Door.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-xl mx-auto mt-2 font-medium">
            Discover thousands of handpicked electronics, premium fashion, kitchenware, and lifestyle goods with lightning-fast delivery across Bangladesh.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-xs sm:text-sm font-bold hover:bg-red-700 shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Browse All Products</span>
              <FiArrowRight />
            </Link>
            <Link
              to="/shop?filter=deals"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-gray-900 text-xs sm:text-sm font-bold hover:bg-white border border-gray-200 shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <FiTag className="text-red-600" />
              <span>Today's Flash Deals</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
