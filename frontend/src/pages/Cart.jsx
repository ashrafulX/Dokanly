import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../Services/api-client';
import FakePaymentModal from '../Components/Payment/FakePaymentModal';
import defaultProductImg from '../assets/default-product.png';
import { 
  FiTrash2, 
  FiMinus, 
  FiPlus, 
  FiShoppingBag, 
  FiArrowRight, 
  FiShield, 
  FiLock,
  FiTag,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiSave
} from 'react-icons/fi';

const Cart = () => {
  const { cart, cartCount, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Shipping & Delivery Address State
  const [addressMode, setAddressMode] = useState(user?.address ? 'saved' : 'new'); // 'saved' | 'new'
  const [recipientName, setRecipientName] = useState(
    user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : ''
  );
  const [contactPhone, setContactPhone] = useState(user?.phone_number || '');
  const [newAddress, setNewAddress] = useState('');
  const [saveToProfile, setSaveToProfile] = useState(true);
  const [addressError, setAddressError] = useState('');

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Sync state whenever user profile loads/updates from database
  useEffect(() => {
    if (user?.address) {
      setAddressMode('saved');
      if (user.phone_number) setContactPhone(user.phone_number);
      if (user.first_name) setRecipientName(`${user.first_name} ${user.last_name || ''}`.trim());
    } else {
      setAddressMode('new');
      if (user?.phone_number) setContactPhone(user.phone_number);
      if (user?.first_name) setRecipientName(`${user.first_name} ${user.last_name || ''}`.trim());
    }
  }, [user]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'DOKANLY20') {
      setDiscountPercent(20);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon code. Try DOKANLY20!');
    }
  };

  const discountAmount = (totalAmount * discountPercent) / 100;
  const shippingFee = totalAmount > 50 || totalAmount === 0 ? 0 : 5.00;
  const finalTotal = Math.max(0, totalAmount - discountAmount + shippingFee);

  // Determine current effective shipping info
  const effectiveAddress = addressMode === 'saved' ? user?.address : newAddress.trim();
  const effectivePhone = contactPhone.trim();
  const effectiveRecipient = recipientName.trim() || (user?.email ? user.email.split('@')[0] : 'Guest Customer');

  const handleProceedToCheckout = () => {
    setAddressError('');

    if (!effectiveAddress) {
      setAddressError('Delivery address is required to place your order.');
      const el = document.getElementById('delivery-address-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!effectivePhone) {
      setAddressError('Contact phone number is required for courier delivery.');
      const el = document.getElementById('delivery-address-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentInfo) => {
    // If the user requested to save this address to their profile in the database:
    if (user && ((addressMode === 'new' && saveToProfile) || !user.address)) {
      try {
        await updateProfile({
          address: effectiveAddress,
          phone_number: effectivePhone,
        });
      } catch (err) {
        console.warn('Notice: Could not save address to profile:', err);
      }
    }

    // Record order locally in localStorage so User Dashboard displays it immediately
    const localOrder = {
      id: paymentInfo.orderId,
      created_at: new Date().toISOString(),
      total_price: finalTotal,
      status: 'Processing',
      payment_status: paymentInfo.status || 'Paid (Fake Sandbox)',
      payment_method: paymentInfo.method,
      transaction_id: paymentInfo.txnId,
      shipping_address: effectiveAddress,
      contact_phone: effectivePhone,
      recipient_name: effectiveRecipient,
      items: cart.map(item => ({
        id: item.product?.id,
        name: item.product?.name,
        price: item.product?.price,
        quantity: item.quantity,
        image: item.product?.image || defaultProductImg,
      })),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('dokanly_orders') || '[]');
      localStorage.setItem('dokanly_orders', JSON.stringify([localOrder, ...existing]));
    } catch {
      // ignore
    }

    // Also attempt backend recording if user is logged in
    if (user) {
      try {
        await apiClient.post('/orders/', {
          payment_status: 'Paid',
          payment_method: paymentInfo.method,
          transaction_id: paymentInfo.txnId,
          total_price: finalTotal,
        });
      } catch (err) {
        console.warn('Backend order post notice:', err.message);
      }
    }

    clearCart();
  };

  if (cartCount === 0) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-16 px-4">
        <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mb-4 shadow-sm">
          <FiShoppingBag className="text-3xl" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm text-center">
          Looks like you haven't added anything to your cart yet. Explore our top products and find great deals!
        </p>
        <Link
          to="/shop"
          className="mt-6 px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
        >
          Explore Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50/60 pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review your items and provide delivery address before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Items List & Address Form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Items List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Item Details</span>
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => {
                  const prod = item.product || {};
                  const image = prod.images?.[0]?.image || prod.image || defaultProductImg;
                  const price = parseFloat(prod.price) || 0;

                  return (
                    <div key={item.id} className="py-4 sm:py-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 p-2 border border-gray-100 shrink-0 flex items-center justify-center">
                          <img 
                            src={image} 
                            alt={prod.name} 
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = defaultProductImg;
                            }}
                            className="h-full w-full object-contain" 
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                            {prod.categoryName || (typeof prod.category === 'object' ? prod.category?.name : 'Category')}
                          </span>
                          <Link to={`/product/${prod.id}`} className="text-xs sm:text-sm font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-1">
                            {prod.name}
                          </Link>
                          <span className="text-xs font-extrabold text-red-600 block">
                            ${price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                          <button
                            onClick={() => updateQuantity(prod.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 transition-colors cursor-pointer"
                          >
                            <FiMinus className="text-xs" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(prod.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 transition-colors cursor-pointer"
                          >
                            <FiPlus className="text-xs" />
                          </button>
                        </div>

                        <div className="text-right min-w-[70px]">
                          <span className="text-xs sm:text-sm font-black text-gray-900 block">
                            ${(price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(prod.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. REQUIRED Delivery Address Section */}
            <div id="delivery-address-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-lg font-bold">
                    <FiMapPin />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                      Delivery & Shipping Address
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Required for doorstep courier shipment & invoice
                    </p>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-black bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full">
                  Mandatory
                </span>
              </div>

              {/* Error Notice */}
              {addressError && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
                  <FiAlertCircle className="text-base shrink-0" />
                  <span>{addressError}</span>
                </div>
              )}

              {/* Logged in: Address Selection Tabs */}
              {user ? (
                <div className="space-y-4">
                  {/* If user already has a saved address in database */}
                  {user.address ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        
                        {/* Option 1: Saved Address */}
                        <div
                          onClick={() => setAddressMode('saved')}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            addressMode === 'saved'
                              ? 'border-red-600 bg-red-50/20 ring-2 ring-red-600/10'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-extrabold text-gray-900">
                                🏠 Saved Address
                              </span>
                              <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                                Database Verified
                              </span>
                            </div>
                            <input
                              type="radio"
                              name="addressMode"
                              checked={addressMode === 'saved'}
                              onChange={() => setAddressMode('saved')}
                              className="accent-red-600 cursor-pointer"
                            />
                          </div>

                          <p className="text-xs text-gray-700 font-medium leading-relaxed">
                            {user.address}
                          </p>

                          <div className="mt-3 pt-2 border-t border-gray-100/80 flex items-center justify-between text-[11px] text-gray-500">
                            <span>Phone: <strong className="text-gray-900 font-mono">{user.phone_number || 'Not set'}</strong></span>
                            <span>Recipient: <strong className="text-gray-900">{user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.email.split('@')[0]}</strong></span>
                          </div>
                        </div>

                        {/* Option 2: Enter New Address */}
                        <div
                          onClick={() => setAddressMode('new')}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            addressMode === 'new'
                              ? 'border-red-600 bg-red-50/20 ring-2 ring-red-600/10'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-extrabold text-gray-900">
                              ✏️ Ship to a New Address
                            </span>
                            <input
                              type="radio"
                              name="addressMode"
                              checked={addressMode === 'new'}
                              onChange={() => setAddressMode('new')}
                              className="accent-red-600 cursor-pointer"
                            />
                          </div>

                          <p className="text-xs text-gray-500 leading-relaxed">
                            Need delivery to an office or another location? Enter custom details below.
                          </p>

                          <span className="text-[11px] text-red-600 font-semibold mt-3">
                            Optionally save to profile →
                          </span>
                        </div>

                      </div>
                    </div>
                  ) : (
                    /* User is logged in but has no saved address yet */
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                      <strong>No Saved Address in Profile:</strong> Please enter your delivery address below. We'll automatically offer to save it for future orders!
                    </div>
                  )}

                  {/* New Address Input Form (Shown when mode is 'new' or when user has no saved address) */}
                  {(addressMode === 'new' || !user.address) && (
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-gray-700 block mb-1">
                            Recipient Full Name
                          </label>
                          <div className="relative">
                            <FiUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
                            <input
                              type="text"
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              placeholder="e.g. Ashraful Islam"
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-gray-700 block mb-1">
                            Contact Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <FiPhone className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              placeholder="e.g. +880 17XXXXXXXX"
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          Full Delivery Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          placeholder="House/Apartment #, Road/Street, Sector/Area, City (e.g. House 42, Road 11, Banani, Dhaka)"
                          className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500 leading-relaxed"
                        />
                      </div>

                      {/* Prompt to save to profile for future orders */}
                      <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={saveToProfile}
                            onChange={(e) => setSaveToProfile(e.target.checked)}
                            className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                          />
                          <span>Save this address to my profile in database for future orders</span>
                        </label>
                        <span className="text-[10px] font-bold uppercase text-red-600 bg-white px-2 py-0.5 rounded-full border border-red-200 shadow-2xs">
                          Auto-Sync
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* Guest Checkout: Prompt login or enter details */
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="text-gray-700">
                      <strong>Already have an account?</strong> Sign in to select your saved delivery address.
                    </div>
                    <Link
                      to="/login"
                      state={{ from: { pathname: '/cart' } }}
                      className="px-4 py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors shrink-0"
                    >
                      Sign In Now
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Recipient Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Contact Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+880 1XXXXXXXXX"
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="House/Apartment #, Road, City, District"
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500 leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary & Checkout Trigger */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
            <h3 className="text-base font-black text-gray-900 tracking-tight pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            {/* Selected Address Preview */}
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Delivering To:
              </span>
              <p className="font-bold text-gray-900 truncate">
                {effectiveRecipient} {effectivePhone ? `(${effectivePhone})` : ''}
              </p>
              <p className="text-gray-600 line-clamp-2 text-[11px]">
                {effectiveAddress || <span className="text-red-500 font-semibold italic">Address not entered yet</span>}
              </p>
            </div>

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-bold text-gray-700 block">Have a Coupon?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. DOKANLY20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono uppercase focus:bg-white focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <FiCheck className="text-xs" /> 20% discount coupon applied!
                </p>
              )}
              {couponError && (
                <p className="text-[11px] font-bold text-red-600">{couponError}</p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <strong className="text-gray-900">${totalAmount.toFixed(2)}</strong>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Discount (20%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <strong className="text-gray-900">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                </strong>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline text-sm font-black text-gray-900">
                <span>Total Amount</span>
                <span className="text-xl font-black text-red-600">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-red-600/30 transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm Order & Pay</span>
              <FiArrowRight className="text-base" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <FiLock className="text-emerald-600 text-xs" />
              <span>Safe 256-Bit SSL Demo Gateway • 100% Mock Checkout</span>
            </div>
          </div>

        </div>

      </div>

      {/* SSLCommerz Sandbox Fake Payment Modal with delivery address passed */}
      <FakePaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        totalAmount={finalTotal}
        shippingDetails={{
          address: effectiveAddress,
          phone: effectivePhone,
          recipient: effectiveRecipient,
          isSaved: addressMode === 'saved',
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Cart;
