import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, SHADOWS } from '../constants/theme';
import { useCart } from '../context/CartContext';
import { useAppTheme } from '../context/ThemeContext';

const ProductCard = ({ product, onPress }) => {
  const { addToCart, loading } = useCart();
  const { theme } = useAppTheme();

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
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        theme.mode === 'light' && SHADOWS.light,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: theme.mode === 'dark' ? '#0f172a' : '#f8fafc' },
        ]}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="bag-handle-outline" size={36} color={theme.textMuted} />
          </View>
        )}
        {isOutOfStock ? (
          <View style={[styles.stockBadge, { backgroundColor: 'rgba(239, 68, 68, 0.9)' }]}>
            <Text style={styles.stockBadgeText}>Out of Stock</Text>
          </View>
        ) : (
          <View style={[styles.stockBadge, { backgroundColor: 'rgba(16, 185, 129, 0.9)' }]}>
            <Text style={styles.stockBadgeText}>{product.stock} Left</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.name, { color: theme.text }]}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <View>
            <Text style={[styles.price, { color: theme.primary }]}>
              ${Number(product.price).toFixed(2)}
            </Text>
            {product.price_with_tax && (
              <Text style={[styles.taxText, { color: theme.textMuted }]}>
                Tax incl: ${Number(product.price_with_tax).toFixed(2)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.cartBtn,
              { backgroundColor: theme.primary },
              isOutOfStock && {
                backgroundColor: theme.mode === 'dark' ? '#334155' : '#e2e8f0',
              },
            ]}
            onPress={handleQuickAdd}
            disabled={isOutOfStock || loading}
          >
            <Ionicons name="cart" size={17} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radiusMd,
    overflow: 'hidden',
    marginBottom: 14,
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: 145,
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
  stockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: SIZES.radiusSm,
  },
  stockBadgeText: {
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
    fontWeight: '800',
  },
  taxText: {
    fontSize: 10,
    marginTop: 1,
  },
  cartBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
