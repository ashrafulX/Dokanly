import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import apiClient from '../Services/api-client';
import { 
  FiPackage, 
  FiUser, 
  FiMapPin, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiShoppingBag, 
  FiLogOut, 
  FiShield, 
  FiEdit2, 
  FiSave,
  FiArrowRight,
  FiDollarSign
} from 'react-icons/fi';

const UserDashboard = () => {
  const { user, isAdmin, logout, updateProfile } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'profile'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Profile Form State
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [phone, setPhone] = useState(user?.phone_number || '');
  const [address, setAddress] = useState(user?.address || '');
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setFirstName(user.first_name || '');
    setLastName(user.last_name || '');
    setPhone(user.phone_number || '');
    setAddress(user.address || '');

    // Fetch real orders from Django backend
    apiClient.get('/orders/')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
        setOrders(data);
      })
      .catch((err) => {
        console.warn('Orders fetch error or empty:', err.message);
      })
      .finally(() => setLoadingOrders(false));
  }, [user, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSaved(false);

    const res = await updateProfile({
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      address: address,
    });

    if (res.success) {
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } else {
      setProfileError(res.error || 'Failed to update profile.');
    }
  };

  if (!user) return null;

  const totalSpent = orders.reduce((sum, ord) => sum + (parseFloat(ord.total_price || ord.total || 0)), 0);

  return (
    <div className="w-full min-h-screen bg-gray-50/60 pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header & Greeting */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-red-600/20">
              {user.first_name ? user.first_name[0] : (user.email ? user.email[0].toUpperCase() : 'U')}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  Welcome, {user.first_name ? `${user.first_name} ${user.last_name}` : user.email?.split('@')[0]}!
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Customer
                </span>
                {isAdmin && (
                  <Link
                    to="/admin-dashboard"
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    Admin Panel →
                  </Link>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {user.email} • Member since {new Date(user.date_joined || Date.now()).getFullYear()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
            >
              <FiShoppingBag className="text-xs" />
              <span>Explore Shop</span>
            </Link>

            <button
              onClick={() => { logout(); navigate('/'); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer"
            >
              <FiLogOut className="text-xs" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: <FiUser /> },
            { id: 'orders', label: `My Orders (${orders.length})`, icon: <FiPackage /> },
            { id: 'profile', label: 'Shipping & Profile', icon: <FiMapPin /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl shadow-xs">
                  <FiPackage />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Orders</span>
                  <strong className="text-2xl font-black text-gray-900">{orders.length}</strong>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-xs">
                  <FiShoppingBag />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Items in Cart</span>
                  <strong className="text-2xl font-black text-gray-900">{cartCount}</strong>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shadow-xs">
                  <FiClock />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Processing Orders</span>
                  <strong className="text-2xl font-black text-gray-900">
                    {orders.filter(o => o.status === 'Processing' || o.payment_status === 'Pending').length}
                  </strong>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shadow-xs">
                  <FiDollarSign />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Spent</span>
                  <strong className="text-2xl font-black text-gray-900">${totalSpent.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">Recent Orders</h3>
                  <p className="text-xs text-gray-500">Live order status and invoice records from Dokanly</p>
                </div>

                {orders.length > 0 && (
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Orders</span>
                    <FiArrowRight className="text-xs" />
                  </button>
                )}
              </div>

              {loadingOrders ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-16 bg-gray-100 rounded-2xl w-full" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mb-3">
                    <FiPackage className="text-2xl" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">No Orders Placed Yet</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs">
                    Your cart is ready! Browse our trending products and place your first order.
                  </p>
                  <Link
                    to="/shop"
                    className="mt-4 px-6 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-xs hover:bg-red-700 transition-colors"
                  >
                    Start Shopping Now
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Payment</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3.5 font-bold font-mono text-gray-900">#{order.id}</td>
                          <td className="py-3.5 text-gray-500">
                            {new Date(order.created_at || Date.now()).toLocaleDateString()}
                          </td>
                          <td className="py-3.5">
                            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                              {order.payment_status || 'Paid (Fake Sandbox)'}
                            </span>
                          </td>
                          <td className="py-3.5">
                            <span className="font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full text-[10px]">
                              {order.status || 'Processing'}
                            </span>
                          </td>
                          <td className="py-3.5 text-right font-black text-gray-900 text-sm">
                            ${parseFloat(order.total_price || order.total || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-2">My Orders History</h3>
            <p className="text-xs text-gray-500 mb-6">Track your packages and view detailed receipts</p>

            {orders.length === 0 ? (
              <div className="py-16 text-center">
                <FiPackage className="text-4xl text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-700">No orders found.</p>
                <Link to="/shop" className="mt-3 inline-block px-5 py-2 rounded-full bg-red-600 text-white text-xs font-bold">
                  Shop Products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-gray-100 rounded-2xl p-4 sm:p-5 hover:border-red-200 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-3">
                      <div>
                        <span className="font-mono font-bold text-gray-900 text-sm">Order #{ord.id}</span>
                        <span className="text-xs text-gray-400 ml-3">
                          {new Date(ord.created_at || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {ord.payment_status || 'Paid (Fake Sandbox)'}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {ord.status || 'Processing'}
                        </span>
                      </div>
                    </div>

                    <div className="py-3 text-xs text-gray-600 space-y-1">
                      <p>Payment Method: <strong className="text-gray-900">SSLCommerz Sandbox Demo</strong></p>
                      <p>Shipping to: <span className="text-gray-900">{user.address || 'Standard Delivery Address'}</span></p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-medium">Order Total:</span>
                      <strong className="text-base font-black text-red-600">
                        ${parseFloat(ord.total_price || ord.total || 0).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SHIPPING & PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs max-w-2xl">
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-1">
              Shipping & Account Profile
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Keep your contact and delivery address updated for seamless deliveries.
            </p>

            {profileSaved && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <FiCheckCircle className="text-base" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            {profileError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <FiAlertCircle className="text-base" />
                <span>{profileError}</span>
              </div>
            )}

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email Address (Read-only)</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+880 1XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Delivery Address</label>
                <textarea
                  rows={3}
                  placeholder="House number, Road, Area, City, Postcode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-red-500 leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <FiSave className="text-xs" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;
