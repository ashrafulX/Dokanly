import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiShoppingBag, FiArrowRight, FiAlertCircle } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Invalid credentials. Please verify your email and password.');
    }
  };

  return (
    <div className="w-full min-h-[85vh] bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <FiShoppingBag className="text-xl" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              Dokan<span className="text-red-600">ly</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-xs text-gray-500 mt-1">Sign in with your email to access your account & orders</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
            <FiAlertCircle className="text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-gray-400 text-base pointer-events-none" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-gray-700">Password</label>
              <a href="#" className="text-[11px] font-semibold text-red-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-gray-400 text-base pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span>Authenticating with Backend...</span>
            ) : (
              <>
                <span>Sign In to Dokanly</span>
                <FiArrowRight className="text-sm" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast-Login Helpers */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block text-center mb-2.5">
            Quick 1-Click Demo Accounts (Database)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setEmail('customer@dokanly.com');
                setPassword('StrongPassword123!');
              }}
              className="px-3 py-2 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-[11px] font-semibold text-gray-700 hover:text-red-600 transition-colors cursor-pointer text-center"
            >
              👤 Customer Account
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@dokanly.com');
                setPassword('StrongPassword123!');
              }}
              className="px-3 py-2 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 text-[11px] font-semibold text-gray-700 hover:text-red-600 transition-colors cursor-pointer text-center"
            >
              🛡️ Admin Account
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-red-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
