import React, { useState } from 'react';
import { 
  FiCreditCard, 
  FiSmartphone, 
  FiCheckCircle, 
  FiX, 
  FiLock,
  FiZap,
  FiDollarSign,
  FiArrowRight,
  FiPrinter
} from 'react-icons/fi';

const FakePaymentModal = ({ isOpen, onClose, totalAmount, shippingDetails = {}, onPaymentSuccess }) => {
  const [activeTab, setActiveTab] = useState('card'); // 'card' | 'mfs' | 'cod'
  const [mfsProvider, setMfsProvider] = useState('bKash'); // 'bKash' | 'Nagad' | 'Rocket'
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Mobile Banking Inputs
  const [mfsPhone, setMfsPhone] = useState('');
  const [mfsOtp, setMfsOtp] = useState('');
  const [mfsPin, setMfsPin] = useState('');

  // Processing state
  const [processing, setProcessing] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);

  if (!isOpen) return null;

  // Auto-fill Fake Demo Card
  const fillDemoCard = () => {
    setCardNumber('4242 •••• •••• 4242');
    setCardHolder(shippingDetails.recipient || 'Ashraful Islam');
    setExpiry('12/28');
    setCvv('123');
  };

  // Auto-fill Fake Demo MFS
  const fillDemoMfs = () => {
    setMfsPhone(shippingDetails.phone || '01700-000000');
    setMfsOtp('1234');
    setMfsPin('•••••');
  };

  const handlePayNow = (method) => {
    setProcessing(true);

    // Simulate 1.2 second gateway communication
    setTimeout(() => {
      const txnId = `SSL-TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const orderId = `DKN-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const successInfo = {
        orderId,
        txnId,
        amount: totalAmount,
        method: method || (activeTab === 'card' ? 'Credit/Debit Card (Visa)' : (activeTab === 'cod' ? 'Cash on Delivery' : `${mfsProvider} Mobile Banking`)),
        date: new Date().toLocaleString(),
        status: activeTab === 'cod' ? 'ORDER PLACED (COD)' : 'PAID (SANDBOX / FAKE PAYMENT)',
        shippingAddress: shippingDetails.address,
        contactPhone: shippingDetails.phone,
        recipientName: shippingDetails.recipient,
      };

      setProcessing(false);
      setPaymentSuccessData(successInfo);

      if (onPaymentSuccess) {
        onPaymentSuccess(successInfo);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
        
        {/* Minimal Header */}
        <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <FiLock className="text-base" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">Checkout</h3>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  Sandbox
                </span>
              </div>
              <p className="text-xs text-gray-400">SSLCommerz Simulation Gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block leading-none">
                Payable
              </span>
              <span className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                ${parseFloat(totalAmount).toFixed(2)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* Subtle Sandbox & Shipping Strip */}
        <div className="px-6 py-2 bg-slate-50/70 border-b border-gray-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Simulation mode · No actual money charged</span>
          </div>
          {shippingDetails.address && (
            <div className="text-[11px] text-gray-500 truncate max-w-[210px]" title={shippingDetails.address}>
              Ship to: <span className="font-medium text-gray-700">{shippingDetails.recipient || 'Customer'}</span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        {paymentSuccessData ? (
          /* Payment Success Minimal Receipt */
          <div className="p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <FiCheckCircle className="text-3xl" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
              Payment Successful
            </span>
            <h3 className="text-xl font-extrabold text-gray-900">
              Order Confirmed!
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm">
              Your simulated transaction has been processed. A receipt has been recorded in your account.
            </p>

            {/* Receipt Card */}
            <div className="w-full bg-gray-50/80 rounded-xl p-4 my-5 border border-gray-100 text-left space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Order ID:</span>
                <strong className="text-gray-900 font-mono">{paymentSuccessData.orderId}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Transaction ID:</span>
                <strong className="text-emerald-700 font-mono">{paymentSuccessData.txnId}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Method:</span>
                <strong className="text-gray-900">{paymentSuccessData.method}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Delivery Address:</span>
                <strong className="text-gray-900 text-right max-w-[220px] truncate">{paymentSuccessData.shippingAddress || 'Profile Address'}</strong>
              </div>
              <div className="flex justify-between py-1 pt-1.5 text-sm font-extrabold">
                <span className="text-gray-700">Total Paid:</span>
                <span className="text-red-600 font-black">${parseFloat(paymentSuccessData.amount).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Done</span>
              <FiArrowRight className="text-xs" />
            </button>
          </div>
        ) : (
          /* Payment Method Tabs & Form */
          <div className="p-6 flex flex-col justify-between">
            
            {/* Segmented Control Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'card'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <FiCreditCard className="text-sm" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mfs')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'mfs'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <FiSmartphone className="text-sm" />
                <span>Mobile Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cod')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'cod'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <FiDollarSign className="text-sm" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* TAB 1: CARD PAYMENT */}
            {activeTab === 'card' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">Card details</span>
                  <button
                    type="button"
                    onClick={fillDemoCard}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <FiZap className="text-xs" />
                    <span>Auto-fill test card</span>
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-500 block mb-1">Card number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-3.5 pr-20 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-300"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">VISA</span>
                      <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">MC</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-500 block mb-1">Cardholder name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ashraful Islam"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-gray-500 block mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-500 block mb-1">CVC / CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MOBILE BANKING (MFS) */}
            {activeTab === 'mfs' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">Select provider</span>
                  <button
                    type="button"
                    onClick={fillDemoMfs}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <FiZap className="text-xs" />
                    <span>Auto-fill test account</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'bKash', active: 'border-pink-500 bg-pink-50/40 text-pink-700' },
                    { id: 'Nagad', active: 'border-orange-500 bg-orange-50/40 text-orange-700' },
                    { id: 'Rocket', active: 'border-purple-500 bg-purple-50/40 text-purple-700' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setMfsProvider(p.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        mfsProvider === p.id
                          ? p.active + ' shadow-xs'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {p.id}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-500 block mb-1">
                    {mfsProvider} mobile number
                  </label>
                  <input
                    type="text"
                    placeholder="017XXXXXXXX"
                    value={mfsPhone}
                    onChange={(e) => setMfsPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-gray-500 block mb-1">Demo OTP</label>
                    <input
                      type="text"
                      placeholder="1234"
                      value={mfsOtp}
                      onChange={(e) => setMfsOtp(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-500 block mb-1">Demo PIN</label>
                    <input
                      type="password"
                      placeholder="•••••"
                      value={mfsPin}
                      onChange={(e) => setMfsPin(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CASH ON DELIVERY */}
            {activeTab === 'cod' && (
              <div className="py-4 px-4.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                  <FiDollarSign className="text-base text-emerald-600" />
                  <span>Pay with Cash upon Delivery</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  No payment needed now. Pay in cash directly to our delivery courier when your order arrives. You may check the parcel before payment.
                </p>
                <div className="pt-2 text-[11px] text-gray-400 font-medium">
                  🚚 Standard delivery: 2-3 business days across Bangladesh.
                </div>
              </div>
            )}

            {/* Clean Action Footer */}
            <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-3 mt-6">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <FiLock className="text-xs text-emerald-600" />
                <span>256-bit SSL secured</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={processing}
                  onClick={() => handlePayNow()}
                  className="px-5 sm:px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 active:scale-98"
                >
                  {processing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>
                      {activeTab === 'cod' ? 'Confirm COD Order' : `Pay $${parseFloat(totalAmount).toFixed(2)}`}
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default FakePaymentModal;
