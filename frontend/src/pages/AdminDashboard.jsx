import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import apiClient from '../Services/api-client';
import { 
  FiPackage, 
  FiGrid, 
  FiShoppingBag, 
  FiDollarSign, 
  FiUsers, 
  FiPlus, 
  FiTrash2, 
  FiRefreshCw, 
  FiCheck, 
  FiX, 
  FiSearch,
  FiArrowLeft,
  FiShield
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'categories' | 'orders'
  
  // Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('10');
  const [newProdCategory, setNewProdCategory] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // New Category Modal State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, ordRes] = await Promise.allSettled([
        apiClient.get('/products/'),
        apiClient.get('/categories/'),
        apiClient.get('/orders/'),
      ]);

      if (prodRes.status === 'fulfilled') {
        const d = prodRes.value.data;
        setProducts(Array.isArray(d) ? d : (d.results || []));
      }
      if (catRes.status === 'fulfilled') {
        const c = catRes.value.data;
        const catArr = Array.isArray(c) ? c : (c.results || []);
        setCategories(catArr);
        if (catArr.length > 0 && !newProdCategory) {
          setNewProdCategory(catArr[0].id);
        }
      }
      if (ordRes.status === 'fulfilled') {
        const o = ordRes.value.data;
        setOrders(Array.isArray(o) ? o : (o.results || []));
      }
    } catch (err) {
      console.warn('Admin fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdCategory) return;
    setModalLoading(true);

    try {
      const payload = {
        name: newProdName.trim(),
        price: parseFloat(newProdPrice),
        stock: parseInt(newProdStock) || 1,
        category_id: parseInt(newProdCategory),
        description: newProdDesc.trim(),
      };

      const res = await apiClient.post('/products/', payload);
      setProducts([res.data, ...products]);
      setShowProductModal(false);
      setNewProdName('');
      setNewProdPrice('');
      setNewProdDesc('');
      setActionSuccessMsg('Product created successfully!');
      setTimeout(() => setActionSuccessMsg(''), 3000);
    } catch (err) {
      alert(err.response?.data ? JSON.stringify(err.response.data) : 'Failed to create product.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await apiClient.delete(`/products/${productId}/`);
      setProducts(products.filter(p => p.id !== productId));
      setActionSuccessMsg('Product deleted.');
      setTimeout(() => setActionSuccessMsg(''), 3000);
    } catch {
      alert('Delete failed.');
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName) return;
    setModalLoading(true);

    try {
      const res = await apiClient.post('/categories/', {
        name: newCatName.trim(),
        description: newCatDesc.trim(),
      });
      setCategories([...categories, res.data]);
      setShowCategoryModal(false);
      setNewCatName('');
      setNewCatDesc('');
      setActionSuccessMsg('Category created successfully!');
      setTimeout(() => setActionSuccessMsg(''), 3000);
    } catch {
      alert('Failed to create category.');
    } finally {
      setModalLoading(false);
    }
  };

  const totalRevenue = orders.reduce((sum, ord) => sum + (parseFloat(ord.total_price || ord.total || 0)), 0);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-16 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto">

        {/* Admin Header */}
        <div className="bg-gray-800/80 rounded-3xl p-6 sm:p-8 border border-gray-700/80 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-red-600/30">
              <FiShield />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Dokanly Admin Console
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  Staff Access
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Store inventory, backend orders, categories & analytics management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-xs font-bold transition-all cursor-pointer"
            >
              <FiRefreshCw className={`text-xs ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-600 hover:border-gray-400 text-gray-300 text-xs font-bold transition-all"
            >
              <FiArrowLeft className="text-xs" />
              <span>Customer View</span>
            </Link>
          </div>
        </div>

        {/* Success Alert */}
        {actionSuccessMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <FiCheck className="text-base" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-gray-800 pb-3 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Analytics Overview', icon: <FiDollarSign /> },
            { id: 'products', label: `Products (${products.length})`, icon: <FiPackage /> },
            { id: 'categories', label: `Categories (${categories.length})`, icon: <FiGrid /> },
            { id: 'orders', label: `Orders (${orders.length})`, icon: <FiShoppingBag /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-gray-800/80 p-5 rounded-3xl border border-gray-700/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                  <FiDollarSign />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Revenue</span>
                  <strong className="text-2xl font-black text-white">${totalRevenue.toFixed(2)}</strong>
                </div>
              </div>

              <div className="bg-gray-800/80 p-5 rounded-3xl border border-gray-700/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center text-xl">
                  <FiPackage />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Products Active</span>
                  <strong className="text-2xl font-black text-white">{products.length}</strong>
                </div>
              </div>

              <div className="bg-gray-800/80 p-5 rounded-3xl border border-gray-700/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
                  <FiShoppingBag />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Orders</span>
                  <strong className="text-2xl font-black text-white">{orders.length}</strong>
                </div>
              </div>

              <div className="bg-gray-800/80 p-5 rounded-3xl border border-gray-700/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl">
                  <FiGrid />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Categories</span>
                  <strong className="text-2xl font-black text-white">{categories.length}</strong>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/80 p-6 rounded-3xl border border-gray-700/80">
                <h3 className="text-base font-bold text-white mb-2">Quick Add: New Product</h3>
                <p className="text-xs text-gray-400 mb-4">Add new item directly into Django PostgreSQL/SQLite database.</p>
                <button
                  onClick={() => setShowProductModal(true)}
                  className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/20 flex items-center gap-2 cursor-pointer"
                >
                  <FiPlus className="text-sm" />
                  <span>Open Add Product Modal</span>
                </button>
              </div>

              <div className="bg-gray-800/80 p-6 rounded-3xl border border-gray-700/80">
                <h3 className="text-base font-bold text-white mb-2">Quick Add: Category</h3>
                <p className="text-xs text-gray-400 mb-4">Create store department with live backend slug & filter.</p>
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="px-5 py-2.5 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FiPlus className="text-sm" />
                  <span>Create Category</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS TABLE */}
        {activeTab === 'products' && (
          <div className="bg-gray-800/80 rounded-3xl p-6 sm:p-8 border border-gray-700/80">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-black text-white">Live Backend Catalog ({products.length})</h3>
                <p className="text-xs text-gray-400">Items fetched directly from Django `/api/v1/products/`</p>
              </div>

              <button
                onClick={() => setShowProductModal(true)}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer"
              >
                <FiPlus className="text-sm" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Product Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Stock</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="py-3 font-mono font-bold text-gray-400">#{p.id}</td>
                      <td className="py-3 font-bold text-white max-w-xs truncate">{p.name}</td>
                      <td className="py-3 text-gray-400 capitalize">{categories.find(c => c.id === p.category)?.name || (typeof p.category === 'object' ? p.category?.name : 'General')}</td>
                      <td className="py-3 font-extrabold text-red-400 text-sm">${p.price}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          (p.stock || 0) > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {p.stock || 0} in stock
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete product"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES TABLE */}
        {activeTab === 'categories' && (
          <div className="bg-gray-800/80 rounded-3xl p-6 sm:p-8 border border-gray-700/80">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-black text-white">Categories ({categories.length})</h3>
                <p className="text-xs text-gray-400">Departments configured in `/api/v1/categories/`</p>
              </div>

              <button
                onClick={() => setShowCategoryModal(true)}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer"
              >
                <FiPlus className="text-sm" />
                <span>Create Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-gray-750 border border-gray-700 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-white capitalize">{c.name}</h4>
                    <p className="text-[11px] text-gray-400 mt-1">{c.description || 'No description'}</p>
                  </div>
                  <span className="font-mono text-xs text-gray-500">#{c.id}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="bg-gray-800/80 rounded-3xl p-6 sm:p-8 border border-gray-700/80">
            <h3 className="text-lg font-black text-white mb-1">Customer Orders ({orders.length})</h3>
            <p className="text-xs text-gray-400 mb-6">Real order stream from `/api/v1/orders/`</p>

            {orders.length === 0 ? (
              <p className="text-xs text-gray-400 py-8 text-center">No customer orders recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-700 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="py-3 font-mono font-bold text-white">#{o.id}</td>
                        <td className="py-3 text-gray-400">{new Date(o.created_at || Date.now()).toLocaleDateString()}</td>
                        <td className="py-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {o.payment_status || 'Paid (Fake Sandbox)'}
                          </span>
                        </td>
                        <td className="py-3 text-gray-300 font-semibold">{o.status || 'Processing'}</td>
                        <td className="py-3 text-right font-black text-sm text-red-400">
                          ${parseFloat(o.total_price || o.total || 0).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* CREATE PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white">Add Product to Backend</h3>
              <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-white">
                <FiX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-bold block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ergonomic Bluetooth Headphones"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="49.99"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-gray-300 font-bold block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Category</label>
                <select
                  required
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white focus:outline-none focus:border-red-500 capitalize"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Product specs, features, warranty..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-700 text-gray-300 font-bold hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md shadow-red-600/30"
                >
                  {modalLoading ? 'Creating...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CATEGORY MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-white">Create New Department</h3>
              <button onClick={() => setShowCategoryModal(false)} className="text-gray-400 hover:text-white">
                <FiX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-bold block mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Watches & Wearables"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-gray-300 font-bold block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Short description of this product department..."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-900 rounded-xl border border-gray-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-700 text-gray-300 font-bold hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md shadow-red-600/30"
                >
                  {modalLoading ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
