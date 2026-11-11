import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import apiClient from '../Services/api-client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import defaultProductImg from '../assets/default-product.png';
import { 
  FiShoppingBag, 
  FiCheck, 
  FiMinus, 
  FiPlus, 
  FiStar, 
  FiTruck, 
  FiShield, 
  FiArrowLeft,
  FiUser,
  FiMessageSquare
} from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [categoryName, setCategoryName] = useState('General');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Review submission state
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMsg, setReviewMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    setReviewMsg('');

    Promise.allSettled([
      apiClient.get(`/products/${id}/`),
      apiClient.get(`/products/${id}/reviews/`),
      apiClient.get('/categories/')
    ])
      .then(([prodRes, revRes, catRes]) => {
        if (prodRes.status === 'fulfilled' && prodRes.value.data) {
          const prodData = prodRes.value.data;
          setProduct(prodData);

          // Resolve category name
          if (catRes.status === 'fulfilled') {
            const cats = Array.isArray(catRes.value.data) ? catRes.value.data : (catRes.value.data?.results || []);
            const match = cats.find(c => c.id === prodData.category);
            if (match) setCategoryName(match.name);
          }
        }

        if (revRes.status === 'fulfilled') {
          const d = revRes.value.data;
          setReviews(Array.isArray(d) ? d : (d.results || []));
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const dbImage = product.images?.[0]?.image || product.image;
    const finalImage = dbImage || defaultProductImg;
    addToCart({ ...product, image: finalImage, categoryName }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (!user) {
      alert('Please log in first to submit a review.');
      return;
    }
    setReviewLoading(true);

    try {
      const res = await apiClient.post(`/products/${id}/reviews/`, {
        ratings: rating,
        comment: comment.trim(),
      });
      setReviews([res.data, ...reviews]);
      setComment('');
      setRating(5);
      setReviewMsg('Your review was successfully submitted!');
      setTimeout(() => setReviewMsg(''), 4000);
    } catch (err) {
      alert(err.response?.data ? JSON.stringify(err.response.data) : 'Failed to submit review.');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen pt-32 pb-16 px-4 max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-semibold">Loading product from database...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-[60vh] pt-32 pb-16 px-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">Product Not Found In Database</h2>
        <p className="text-xs text-gray-500 mt-2">The product you requested does not exist or was deleted.</p>
        <Link to="/shop" className="mt-4 inline-block px-6 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold">
          Back to Shop Catalog
        </Link>
      </div>
    );
  }

  // Database image if available, else default image from src/assets
  const dbImage = product.images?.[0]?.image || product.image;
  const imageSrc = dbImage || defaultProductImg;
  const price = parseFloat(product.price) || 0;
  const priceWithTax = product.price_with_tax || (price * 1.1).toFixed(2);

  return (
    <div className="w-full min-h-screen bg-gray-50/50 pt-28 pb-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Link */}
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors mb-6"
        >
          <FiArrowLeft />
          <span>Back to Products</span>
        </Link>

        {/* Product Card Details */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left: Product Image */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-8 border border-gray-100 relative min-h-[360px]">
            <img 
              src={imageSrc} 
              alt={product.name} 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultProductImg;
              }}
              className="max-h-[320px] w-full object-contain"
            />
            {product.stock <= 5 && product.stock > 0 && (
              <span className="absolute top-4 left-4 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
                Low Stock: {product.stock} units
              </span>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-wider">
                  {categoryName}
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  Product ID #{product.id}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 my-4">
                <span className="text-3xl font-black text-gray-900">
                  ${price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  (Incl. Tax: ${priceWithTax})
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-b border-gray-100 py-4 my-4">
                {product.description || "Authentic quality certified product from the Dokanly database."}
              </p>

              {/* Stock info */}
              <div className="flex items-center gap-2 text-xs font-bold mb-6">
                <span className="text-gray-500">Stock Availability:</span>
                <span className={product.stock > 0 ? "text-emerald-600" : "text-red-500"}>
                  {product.stock > 0 ? `${product.stock} units in stock` : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-2xl bg-gray-50 p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-gray-600 transition-colors cursor-pointer"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white text-gray-600 transition-colors cursor-pointer"
                  >
                    <FiPlus />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-4 px-6 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white shadow-md shadow-red-600/30 active:scale-98'
                  }`}
                >
                  {added ? (
                    <>
                      <FiCheck className="text-base" />
                      <span>Added to Your Cart!</span>
                    </>
                  ) : (
                    <>
                      <FiShoppingBag className="text-base" />
                      <span>Add to Cart • ${(price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-gray-100 text-[11px] text-gray-500 font-semibold">
              <div className="flex items-center gap-2">
                <FiTruck className="text-red-500 text-base" />
                <span>Fast Doorstep Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="text-red-500 text-base" />
                <span>100% Genuine Warranty</span>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Section (Direct from Backend Database) */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                Customer Reviews ({reviews.length})
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Verified reviews submitted to the Django backend database
              </p>
            </div>
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2">
              <FiMessageSquare className="text-red-600" />
              Write a Review
            </h3>

            {reviewMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold">
                {reviewMsg}
              </div>
            )}

            <div className="flex items-center gap-3 mb-3">
              <label className="text-xs font-bold text-gray-700">Rating:</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <FiStar 
                      className={`text-lg ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={user ? "Share your experience with this product..." : "Please log in to write a review."}
              disabled={!user}
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 disabled:bg-gray-100"
            />

            <div className="mt-3 flex justify-between items-center">
              {!user ? (
                <span className="text-[11px] text-gray-500">
                  <Link to="/login" className="text-red-600 font-bold hover:underline">Log in</Link> to post a review.
                </span>
              ) : <div />}

              <button
                type="submit"
                disabled={reviewLoading || !user}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                {reviewLoading ? 'Submitting...' : 'Post Review'}
              </button>
            </div>
          </form>

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs font-medium">
              No reviews yet for this product. Be the first to share your thoughts!
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center">
                        <FiUser />
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        {rev.user?.name || rev.user?.first_name || 'Verified Buyer'}
                      </span>
                    </div>

                    <div className="flex items-center text-amber-400 text-xs">
                      {Array.from({ length: rev.ratings || 5 }).map((_, i) => (
                        <FiStar key={i} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed pl-10">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
