import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../../api/client';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import LoadingSpinner from '../../components/LoadingSpinner';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const { addToCart, loading: cartLoading } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Review Modal state
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const res = await apiClient.get(`/products/${productId}/`);
      setProduct(res.data);
    } catch (e) {
      console.error('Failed to fetch product details:', e);
      Alert.alert('Error', 'Product could not be loaded.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await apiClient.get(`/products/${productId}/reviews/`);
      const data = res.data.results || res.data;
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch reviews:', e);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    const res = await addToCart(product.id, quantity);
    if (res.requireAuth) {
      Alert.alert('Login Required', res.message, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => navigation.navigate('ProfileTab') },
      ]);
    } else if (res.success) {
      Alert.alert('Success', 'Product added to your cart!', [
        { text: 'Continue Shopping' },
        { text: 'Go to Cart', onPress: () => navigation.navigate('CartTab') },
      ]);
    } else {
      Alert.alert('Error', res.message);
    }
  };

  const handleAddReview = async () => {
    if (!isAuthenticated) {
      setReviewModalVisible(false);
      Alert.alert('Login Required', 'You must be logged in to leave a review.');
      return;
    }

    if (!comment.trim()) {
      Alert.alert('Validation Error', 'Please write a brief comment.');
      return;
    }

    setSubmittingReview(true);
    try {
      await apiClient.post(`/products/${productId}/reviews/`, {
        ratings: rating,
        comment: comment.trim(),
      });
      setComment('');
      setRating(5);
      setReviewModalVisible(false);
      fetchReviews();
      Alert.alert('Thank You', 'Your review has been submitted!');
    } catch (error) {
      console.error('Review submit error:', error.response?.data || error);
      Alert.alert('Error', 'Could not post review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    Alert.alert('Delete Review', 'Are you sure you want to delete your review?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await apiClient.delete(`/products/${productId}/reviews/${reviewId}/`);
            fetchReviews();
          } catch (e) {
            Alert.alert('Error', 'Failed to delete review.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [];
  const inStock = product.stock > 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image Slider */}
        <View style={styles.imageGallery}>
          {images.length > 0 ? (
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={images}
              keyExtractor={(item) => item.id.toString()}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                setActiveImageIndex(index);
              }}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.image }}
                  style={styles.galleryImage}
                  resizeMode="cover"
                />
              )}
            />
          ) : (
            <View style={styles.placeholderGallery}>
              <Ionicons name="image-outline" size={64} color="#94a3b8" />
            </View>
          )}

          {images.length > 1 && (
            <View style={styles.indicatorContainer}>
              {images.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.indicator,
                    i === activeImageIndex && styles.indicatorActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Product Details Section */}
        <View style={styles.infoCard}>
          <View style={styles.titleRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <View
              style={[
                styles.stockBadge,
                { backgroundColor: inStock ? '#dcfce7' : '#fee2e2' },
              ]}
            >
              <Text
                style={[
                  styles.stockBadgeText,
                  { color: inStock ? COLORS.accent : COLORS.danger },
                ]}
              >
                {inStock ? `${product.stock} In Stock` : 'Out of Stock'}
              </Text>
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
            {product.price_with_tax && (
              <Text style={styles.taxPrice}>
                (Tax incl.: ${Number(product.price_with_tax).toFixed(2)})
              </Text>
            )}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Description</Text>
            <Text style={styles.descriptionText}>
              {product.description || 'No detailed description available for this item.'}
            </Text>
          </View>

          {/* Quantity Selector */}
          {inStock && (
            <View style={styles.quantitySection}>
              <Text style={styles.sectionHeading}>Quantity</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Ionicons name="remove" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  <Ionicons name="add" size={20} color={COLORS.text} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionHeading}>
                Customer Reviews ({reviews.length})
              </Text>
              <TouchableOpacity
                onPress={() => setReviewModalVisible(true)}
                style={styles.writeReviewBtn}
              >
                <Ionicons name="create-outline" size={16} color={COLORS.primary} />
                <Text style={styles.writeReviewText}>Write Review</Text>
              </TouchableOpacity>
            </View>

            {reviews.length === 0 ? (
              <Text style={styles.noReviews}>
                No reviews yet. Be the first to review this product!
              </Text>
            ) : (
              reviews.map((rev) => (
                <View key={rev.id} style={styles.reviewItem}>
                  <View style={styles.reviewTopRow}>
                    <Text style={styles.reviewerName}>
                      {rev.user?.name || 'Verified Customer'}
                    </Text>
                    <View style={styles.starsContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= rev.ratings ? 'star' : 'star-outline'}
                          size={14}
                          color={COLORS.star}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{rev.comment}</Text>
                  {user && rev.user?.id === user.id && (
                    <TouchableOpacity
                      onPress={() => handleDeleteReview(rev.id)}
                      style={styles.deleteReviewBtn}
                    >
                      <Text style={styles.deleteReviewText}>Delete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={[styles.bottomBar, SHADOWS.medium]}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomTotalLabel}>Total Price</Text>
          <Text style={styles.bottomTotalPrice}>
            ${(Number(product.price) * quantity).toFixed(2)}
          </Text>
        </View>
        <CustomButton
          title={inStock ? 'Add to Cart' : 'Out of Stock'}
          onPress={handleAddToCart}
          disabled={!inStock}
          loading={cartLoading}
          style={styles.addToCartBtn}
          icon={<Ionicons name="cart" size={20} color="#ffffff" />}
        />
      </View>

      {/* Review Submission Modal */}
      <Modal
        visible={reviewModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Rate & Review</Text>
              <TouchableOpacity onPress={() => setReviewModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {/* Star Picker */}
            <Text style={styles.starLabel}>Select your rating:</Text>
            <View style={styles.starPickerRow}>
              {[1, 2, 3, 4, 5].map((val) => (
                <TouchableOpacity key={val} onPress={() => setRating(val)}>
                  <Ionicons
                    name={val <= rating ? 'star' : 'star-outline'}
                    size={32}
                    color={COLORS.star}
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <CustomInput
              label="Your Feedback"
              placeholder="What did you like or dislike about this product?"
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />

            <CustomButton
              title="Submit Review"
              onPress={handleAddReview}
              loading={submittingReview}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageGallery: {
    width: SCREEN_WIDTH,
    height: 300,
    backgroundColor: '#f1f5f9',
    position: 'relative',
  },
  galleryImage: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  placeholderGallery: {
    width: SCREEN_WIDTH,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: COLORS.primary,
    width: 18,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
  },
  stockBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
    gap: 8,
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
  },
  taxPrice: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  section: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  quantitySection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    alignSelf: 'flex-start',
    borderRadius: SIZES.radiusMd,
    padding: 4,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusSm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    color: COLORS.text,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  writeReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  writeReviewText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  noReviews: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  reviewItem: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: SIZES.radiusMd,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  reviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 13,
    color: '#475569',
    marginTop: 6,
  },
  deleteReviewBtn: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  deleteReviewText: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  bottomPriceCol: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  bottomTotalPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  addToCartBtn: {
    flex: 1.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  starLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  starPickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default ProductDetailScreen;

