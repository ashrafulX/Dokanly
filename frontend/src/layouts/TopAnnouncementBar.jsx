import React from 'react';
import { FiTruck, FiPhoneCall, FiTag } from 'react-icons/fi';

const TopAnnouncementBar = () => {
  return (
    <div className="w-full bg-[#111827] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-gray-800 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4">
        
        {/* Left message */}
        <div className="flex items-center gap-2 font-medium text-gray-300">
          <span className="inline-flex items-center gap-1 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <FiTag className="text-[10px]" /> Promo
          </span>
          <span>
            Ramadan / Spring Drop: Get <strong className="text-white">20% OFF</strong> with coupon code <span className="text-red-400 font-bold underline decoration-dotted">DOKANLY20</span>
          </span>
        </div>

        {/* Right utility links */}
        <div className="hidden md:flex items-center gap-4 text-gray-400 text-xs">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <FiTruck className="text-xs text-red-500" />
            <span>Free Delivery Over $50</span>
          </div>
          <span className="text-gray-700">•</span>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <FiPhoneCall className="text-xs text-red-500" />
            <span>24/7 Helpline: +880 1800-DOKANLY</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopAnnouncementBar;
