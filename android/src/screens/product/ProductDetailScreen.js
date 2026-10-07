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
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../../api/client';
import { SIZES, SHADOWS } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import LoadingSpinner from '../../components/LoadingSpinner';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const { addToCart, loading: cartLoading } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { theme } = useAppTheme();

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
        { text: 'Sign In', onPress: () => navigation.navigate('ProfileTab') },
      ]);
    } else if (res.success) {
      Alert.alert('🎉 Added to Cart', `${product.name} (${quantity} pcs) has been added to your shopping cart.`, [
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
      Alert.alert('Thank You', 'Your review has been submitted successfully!');
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image Slider */}
        <View
          style={[
            styles.imageGallery,
            { backgroundColor: theme.mode === 'dark' ? '#0f172a' : '#f8fafc' },
          ]}
        >
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
              <Ionicons name="bag-handle-outline" size={64} color={theme.textMuted} />
            </View>
          )}

          {images.length > 1 && (
            <View style={styles.indicatorContainer}>
              {images.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.indicator,
                    { backgroundColor: theme.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)' },
                    i === activeImageIndex && {
                      backgroundColor: theme.primary,
                      width: 20,
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Product Details Section */}
        <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
          <View style={styles.titleRow}>
            <Text style={[styles.productName, { color: theme.text }]}>
              {product.name}
            </Text>
            <View
              style={[
                styles.stockBadge,
                { backgroundColor: inStock ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)' },
              ]}
            >
              <Text
                style={[
                  styles.stockBadgeText,
                  { color: inStock ? theme.accent : theme.danger },
                ]}
              >
                {inStock ? `${product.stock} In Stock` : 'Out of Stock'}
              </Text>
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: theme.primary }]}>
              ${Number(product.price).toFixed(2)}
            </Text>
            {product.price_with_tax && (
              <Text style={[styles.taxPrice, { color: theme.textMuted }]}>
                (Tax incl: ${Number(product.price_with_tax).toFixed(2)})
              </Text>
            )}
          </View>

          {/* Description */}
          <View style={[styles.section, { borderTopColor: theme.border }]}>
            <Text style={[styles.sectionHeading, { color: theme.text }]}>
              Description
            </Text>
            <Text style={[styles.descriptionText, { color: theme.mode === 'dark' ? '#cbd5e1' : '#475569' }]}>
              {product.description || 'No detailed description available for this item.'}
            </Text>
          </View>

          {/* Quantity Selector */}
          {inStock && (
            <View style={[styles.quantitySection, { borderTopColor: theme.border }]}>
              <Text style={[styles.sectionHeading, { color: theme.text }]}>
                Quantity
              </Text>
              <View
                style={[
                  styles.quantityControls,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <TouchableOpacity
                  style={[styles.qtyBtn, { backgroundColor: theme.card }]}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Ionicons name="remove" size={18} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.qtyText, { color: theme.text }]}>
                  {quantity}
                </Text>
                <TouchableOpacity
                  style={[styles.qtyBtn, { backgroundColor: theme.card }]}
                  onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  <Ionicons name="add" size={18} color={theme.text} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Reviews Section */}
          <View style={[styles.section, { borderTopColor: theme.border }]}>
            <View style={styles.reviewsHeader}>
              <Text style={[styles.sectionHeading, { color: theme.text }]}>
                Customer Reviews ({reviews.length})
              </Text>
              <TouchableOpacity
                onPress={() => setReviewModalVisible(true)}
                style={styles.writeReviewBtn}
              >
                <Ionicons name="create-outline" size={16} color={theme.primary} />
                <Text style={[styles.writeReviewText, { color: theme.primary }]}>
                  Write Review
                </Text>
              </TouchableOpacity>
            </View>

            {reviews.length === 0 ? (
              <Text style={[styles.noReviews, { color: theme.textMuted }]}>
                No reviews yet. Be the first to review this product!
              </Text>
            ) : (
              reviews.map((rev) => (
                <View
                  key={rev.id}
                  style={[
                    styles.reviewItem,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <View style={styles.reviewTopRow}>
                    <Text style={[styles.reviewerName, { color: theme.text }]}>
                      {rev.user?.name || 'Verified Customer'}
                    </Text>
                    <View style={styles.starsContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= rev.ratings ? 'star' : 'star-outline'}
                          size={13}
                          color={theme.star}
                        />
                      ))}
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.reviewComment,
                      { color: theme.mode === 'dark' ? '#cbd5e1' : '#475569' },
                    ]}
                  >
                    {rev.comment}
                  </Text>
                  {user && rev.user?.id === user.id && (
                    <TouchableOpacity
                      onPress={() => handleDeleteReview(rev.id)}
                      style={styles.deleteReviewBtn}
                    >
                      <Text style={[styles.deleteReviewText, { color: theme.danger }]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
          theme.mode === 'light' && SHADOWS.light,
        ]}
      >
        <View style={styles.bottomPriceCol}>
          <Text style={[styles.bottomTotalLabel, { color: theme.textMuted }]}>
            Total Amount
          </Text>
          <Text style={[styles.bottomTotalPrice, { color: theme.primary }]}>
            ${(Number(product.price) * quantity).toFixed(2)}
          </Text>
        </View>
        <CustomButton
          title={inStock ? 'Add to Cart' : 'Out of Stock'}
          onPress={handleAddToCart}
          disabled={!inStock}
          loading={cartLoading}
          style={styles.addToCartBtn}
          icon={<Ionicons name="cart" size={19} color="#ffffff" />}
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
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Rate & Review Product
              </Text>
              <TouchableOpacity onPress={() => setReviewModalVisible(false)}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            {/* Star Picker */}
            <Text style={[styles.starLabel, { color: theme.textMuted }]}>
              Select your rating:
            </Text>
            <View style={styles.starPickerRow}>
              {[1, 2, 3, 4, 5].map((val) => (
                <TouchableOpacity key={val} onPress={() => setRating(val)}>
                  <Ionicons
                    name={val <= rating ? 'star' : 'star-outline'}
                    size={32}
                    color={theme.star}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageGallery: {
    width: SCREEN_WIDTH,
    height: 310,
    position: 'relative',
  },
  galleryImage: {
    width: SCREEN_WIDTH,
    height: 310,
  },
  placeholderGallery: {
    width: SCREEN_WIDTH,
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 14,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  infoCard: {
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
    fontWeight: '800',
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
    fontWeight: '900',
  },
  taxPrice: {
    fontSize: 13,
  },
  section: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  quantitySection: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: SIZES.radiusMd,
    padding: 3,
    borderWidth: 1,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: SIZES.radiusSm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '800',
    marginHorizontal: 16,
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
    fontWeight: '700',
  },
  noReviews: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  reviewItem: {
    padding: 12,
    borderRadius: SIZES.radiusMd,
    marginBottom: 10,
    borderWidth: 1,
  },
  reviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '700',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 13,
    marginTop: 6,
  },
  deleteReviewBtn: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  deleteReviewText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  bottomPriceCol: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  bottomTotalPrice: {
    fontSize: 22,
    fontWeight: '900',
  },
  addToCartBtn: {
    flex: 1.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    fontWeight: '800',
  },
  starLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  starPickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default ProductDetailScreen;
