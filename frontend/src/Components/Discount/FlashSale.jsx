import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FiClock, FiTag, FiCheck, FiArrowRight } from 'react-icons/fi';

const FlashSale = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('DOKANLY20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-8 sm:py-12 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white p-6 sm:p-10 shadow-xl shadow-red-600/10">
          
          {/* Subtle background glow circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
            
            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
                <FiClock className="text-sm animate-pulse" />
                <span>Limited Time Flash Sale</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Get Up To 50% Off On Selected Products!
              </h2>

              <p className="text-xs sm:text-sm text-red-50/90 leading-relaxed font-medium">
                Don't miss today's best deals on trending electronics, seasonal fashion, and home accessories. Stock is strictly limited.
              </p>

              {/* Coupon Code Pill */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs">
                  <FiTag className="text-white text-xs" />
                  <span className="font-semibold">Code:</span>
                  <strong className="tracking-wider font-extrabold text-white">DOKANLY20</strong>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-full bg-white text-red-600 hover:bg-red-50 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1 active:scale-95"
                >
                  {copied ? (
                    <>
                      <FiCheck className="text-green-600 text-xs" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <span>Copy Code</span>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Live Countdown + CTA Button */}
            <div className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full sm:w-auto shrink-0">
              <div className="text-xs font-bold uppercase tracking-wider text-red-100 flex items-center gap-1.5">
                <FiClock className="text-xs" />
                <span>Offer Expires In</span>
              </div>

              {/* Countdown Numbers */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center bg-white text-gray-900 rounded-xl px-3 py-2 min-w-[56px] shadow-sm">
                  <span className="text-xl sm:text-2xl font-black leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mt-1">Hours</span>
                </div>
                <span className="text-xl font-bold">:</span>
                <div className="flex flex-col items-center bg-white text-gray-900 rounded-xl px-3 py-2 min-w-[56px] shadow-sm">
                  <span className="text-xl sm:text-2xl font-black leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mt-1">Mins</span>
                </div>
                <span className="text-xl font-bold">:</span>
                <div className="flex flex-col items-center bg-white text-gray-900 rounded-xl px-3 py-2 min-w-[56px] shadow-sm">
                  <span className="text-xl sm:text-2xl font-black leading-none text-red-600">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mt-1">Secs</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to="/shop?filter=deals"
                className="w-full text-center inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-red-600 hover:bg-red-50 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Shop Flash Deals</span>
                <FiArrowRight className="text-xs" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
