import React, { useState } from 'react';
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
  FiCheck
} from 'react-icons/fi';

const Cart = () => {
  const { cart, cartCount, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

  const handlePaymentSuccess = async (paymentInfo) => {
    // If logged in, create real order in Django backend
    if (user) {
      try {
        await apiClient.post('/orders/', {
          payment_status: 'Paid (Fake Sandbox)',
          payment_method: paymentInfo.method,
          transaction_id: paymentInfo.txnId,
          total_price: finalTotal,
        });
      } catch (err) {
        console.warn('Backend order recording notice:', err.message);
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
          <p className="text-xs text-gray-500 mt-1">Review your items before proceeding to SSLCommerz Demo checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
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
                          {prod.category?.name || 'Category'}
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
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 cursor-pointer"
                        >
                          <FiMinus className="text-xs" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(prod.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-600 cursor-pointer"
                        >
                          <FiPlus className="text-xs" />
                        </button>
                      </div>

                      <div className="text-right min-w-[60px] hidden sm:block">
                        <span className="text-xs font-black text-gray-900">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(prod.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6">
            <h3 className="text-base font-black text-gray-900 tracking-tight pb-3 border-b border-gray-100">
              Order Summary
            </h3>

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
              onClick={() => setShowPaymentModal(true)}
              className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-red-600/30 transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Pay with SSLCommerz (Fake)</span>
              <FiArrowRight className="text-base" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <FiLock className="text-emerald-600 text-xs" />
              <span>Safe 256-Bit SSL Demo Gateway • 100% Mock Checkout</span>
            </div>
          </div>

        </div>

      </div>

      {/* SSLCommerz Sandbox Fake Payment Modal */}
      <FakePaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        totalAmount={finalTotal}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Cart;
