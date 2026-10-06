import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onPress }) => {
  const { addToCart, loading } = useCart();
  
  // Dokanly products return an `images` array with `{ id, image }`
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].image
      : null;

  const isOutOfStock = product.stock <= 0;

  const handleQuickAdd = async () => {
    if (isOutOfStock) return;
    await addToCart(product.id, 1);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, SHADOWS.small]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="image-outline" size={36} color="#94a3b8" />
          </View>
        )}
        {isOutOfStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
            {product.price_with_tax && (
              <Text style={styles.taxText}>
                Incl. tax: ${Number(product.price_with_tax).toFixed(2)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.cartBtn,
              isOutOfStock && styles.cartBtnDisabled,
            ]}
            onPress={handleQuickAdd}
            disabled={isOutOfStock || loading}
          >
            <Ionicons name="cart-outline" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusMd,
    overflow: 'hidden',
    marginBottom: 16,
    flex: 1,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#f1f5f9',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: SIZES.radiusSm,
  },
  outOfStockText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  taxText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  cartBtn: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtnDisabled: {
    backgroundColor: '#cbd5e1',
  },
});

export default ProductCard;

