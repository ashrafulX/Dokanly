import React, { useState } from 'react';
import { 
  FiCreditCard, 
  FiSmartphone, 
  FiShield, 
  FiCheckCircle, 
  FiX, 
  FiAlertTriangle, 
  FiLock,
  FiZap,
  FiDollarSign
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
  const [mfsStep, setMfsStep] = useState(1); // 1: Phone, 2: OTP & PIN

  // Processing state
  const [processing, setProcessing] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);

  if (!isOpen) return null;

  // Auto-fill Fake Demo Card
  const fillDemoCard = () => {
    setCardNumber('4242 •••• •••• 4242');
    setCardHolder('Ashraful Islam (Demo)');
    setExpiry('12/28');
    setCvv('123');
  };

  // Auto-fill Fake Demo MFS
  const fillDemoMfs = () => {
    setMfsPhone('01700-000000');
    setMfsOtp('1234');
    setMfsPin('•••••');
  };

  const handlePayNow = (method) => {
    setProcessing(true);

    // Simulate 1.5 second gateway communication
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
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-scale-in">
        
        {/* SSLCommerz Demo Header */}
        <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-red-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-lg shadow-sm">
              <FiShield className="text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight">
                  SSLCOMMERZ
                </span>
                <span className="text-[10px] uppercase font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                  Fake Sandbox
                </span>
              </div>
              <p className="text-[11px] text-gray-300">
                Dokanly Automated Payment Gateway System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block font-medium uppercase tracking-wider">Amount To Pay</span>
              <span className="text-lg sm:text-xl font-black text-amber-400">
                ${parseFloat(totalAmount).toFixed(2)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* Fake Payment Warning Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center gap-2.5 text-amber-900 text-xs font-semibold">
          <FiAlertTriangle className="text-amber-600 text-base shrink-0" />
          <span>
            <strong>FAKE PAYMENT DEMO:</strong> This is a simulation sandbox. No real bank transaction will occur. Feel free to use the Auto-Fill buttons!
          </span>
        </div>

        {/* Modal Body */}
        {paymentSuccessData ? (
          /* Payment Success Receipt */
          <div className="p-6 sm:p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <FiCheckCircle className="text-4xl" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              Payment Successful (Sandbox Verified)
            </span>
            <h3 className="text-2xl font-black text-gray-900">
              Thank You For Your Order!
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm">
              Your simulated payment was processed successfully. An order confirmation receipt has been generated.
            </p>

            {/* Receipt Summary Card */}
            <div className="w-full max-w-md bg-gray-50 rounded-2xl p-4 my-6 border border-gray-200 text-left space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Order ID:</span>
                <strong className="text-gray-900 font-mono">{paymentSuccessData.orderId}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Transaction ID:</span>
                <strong className="text-emerald-700 font-mono">{paymentSuccessData.txnId}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Payment Gateway:</span>
                <strong className="text-gray-900">SSLCommerz Sandbox</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Method Used:</span>
                <strong className="text-gray-900">{paymentSuccessData.method}</strong>
              </div>
              <div className="flex justify-between py-1 pt-2 text-sm font-extrabold">
                <span className="text-gray-700">Total Paid:</span>
                <span className="text-red-600 font-black">${parseFloat(paymentSuccessData.amount).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          /* Payment Method Tabs & Form */
          <div className="flex flex-col sm:flex-row min-h-[380px]">
            
            {/* Left Method Tabs */}
            <div className="w-full sm:w-48 bg-gray-50 border-r border-gray-200 p-3 flex sm:flex-col gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('card')}
                className={`flex-1 sm:flex-none flex items-center gap-2.5 px-3 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'card'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                <FiCreditCard className="text-base" />
                <span>Credit / Debit Card</span>
              </button>

              <button
                onClick={() => setActiveTab('mfs')}
                className={`flex-1 sm:flex-none flex items-center gap-2.5 px-3 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'mfs'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                <FiSmartphone className="text-base" />
                <span>Mobile Banking</span>
              </button>

              <button
                onClick={() => setActiveTab('cod')}
                className={`flex-1 sm:flex-none flex items-center gap-2.5 px-3 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'cod'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900'
                }`}
              >
                <FiDollarSign className="text-base" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Right Tab Content */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
              
              {/* TAB 1: CARDS */}
              {activeTab === 'card' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Card Payment</h4>
                      <p className="text-[11px] text-gray-500">Supports Visa, Mastercard, AMEX</p>
                    </div>

                    <button
                      type="button"
                      onClick={fillDemoCard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold transition-colors cursor-pointer border border-red-200"
                    >
                      <FiZap className="text-xs" />
                      <span>Auto-Fill Fake Card</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono focus:bg-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs focus:bg-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">Expires (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono focus:bg-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono focus:bg-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MOBILE BANKING (MFS) */}
              {activeTab === 'mfs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Mobile Financial Services</h4>
                      <p className="text-[11px] text-gray-500">Select your provider</p>
                    </div>

                    <button
                      type="button"
                      onClick={fillDemoMfs}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-bold transition-colors cursor-pointer border border-red-200"
                    >
                      <FiZap className="text-xs" />
                      <span>Auto-Fill Fake Number</span>
                    </button>
                  </div>

                  {/* Provider Pills */}
                  <div className="flex gap-2">
                    {['bKash', 'Nagad', 'Rocket'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setMfsProvider(p)}
                        className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                          mfsProvider === p
                            ? 'bg-rose-50 border-red-500 text-red-600 shadow-xs'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">
                        {mfsProvider} Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="017XXXXXXXX"
                        value={mfsPhone}
                        onChange={(e) => setMfsPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono focus:bg-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">Fake OTP</label>
                        <input
                          type="text"
                          placeholder="1234"
                          value={mfsOtp}
                          onChange={(e) => setMfsOtp(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono focus:bg-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">Fake PIN</label>
                        <input
                          type="password"
                          placeholder="•••••"
                          value={mfsPin}
                          onChange={(e) => setMfsPin(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono focus:bg-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CASH ON DELIVERY */}
              {activeTab === 'cod' && (
                <div className="space-y-3 py-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                    <FiDollarSign className="text-2xl" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900">Cash on Delivery</h4>
                  <p className="text-xs text-gray-600 leading-relaxed max-w-md">
                    Pay in cash directly to our delivery courier when your package arrives at your shipping address. You can still inspect your parcel before making the payment.
                  </p>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-500">
                    🚚 Standard delivery: 2-3 business days within Dhaka, 3-5 days nationwide.
                  </div>
                </div>
              )}

              {/* Bottom Pay Button */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <FiLock className="text-emerald-600" />
                  <span>256-Bit SSL Demo Encryption</span>
                </div>

                <button
                  type="button"
                  disabled={processing}
                  onClick={() => handlePayNow()}
                  className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-xs font-extrabold shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Simulating Gateway...</span>
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
