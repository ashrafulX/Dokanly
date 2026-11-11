import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiShoppingBag, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Registration failed. Please check your data.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center pt-28 pb-16 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <FiShoppingBag className="text-xl" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Dokan<span className="text-red-600">ly</span>
            </span>
          </Link>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
          <p className="text-xs text-gray-500 mt-1">Join Dokanly to enjoy fast checkout & personalized orders</p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
            <FiAlertCircle className="text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">First Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
                <input
                  type="text"
                  name="first_name"
                  required
                  placeholder="John"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Last Name</label>
              <input
                type="text"
                name="last_name"
                required
                placeholder="Doe"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
              <input
                type="password"
                name="password"
                required
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
                <input
                  type="text"
                  name="phone_number"
                  placeholder="+880 1XXXXXXXXX"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Delivery City/Area</label>
              <div className="relative">
                <FiMapPin className="absolute left-3.5 top-3.5 text-gray-400 text-sm pointer-events-none" />
                <input
                  type="text"
                  name="address"
                  placeholder="Dhaka, Bangladesh"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span>Registering in Backend...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <FiArrowRight className="text-sm" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-red-600 hover:underline">
              Sign In here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
