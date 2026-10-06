import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const CartScreen = ({ navigation }) => {
  const { isAuthenticated } = useAuth();
  const { cart, loading, updateQuantity, removeFromCart, checkout, totalPrice, refreshCart } =
    useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Ionicons name="lock-closed-outline" size={64} color={COLORS.textMuted} />
        <Text style={styles.authTitle}>Login Required</Text>
        <Text style={styles.authSubtitle}>
          Please sign in to view your shopping cart and complete your orders.
        </Text>
        <CustomButton
          title="Go to Sign In"
          onPress={() => navigation.navigate('ProfileTab')}
          style={styles.authBtn}
        />
      </SafeAreaView>
    );
  }

  if (loading && !cart) {
    return <LoadingSpinner message="Loading your cart..." />;
  }

  const items = cart?.items || [];

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add items before checking out.');
      return;
    }

    Alert.alert(
      'Confirm Order',
      `Are you sure you want to place this order for $${Number(totalPrice).toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order',
          onPress: async () => {
            setCheckingOut(true);
            const res = await checkout();
            setCheckingOut(false);

            if (res.success) {
              Alert.alert(
                '🎉 Order Placed Successfully!',
                `Your order #${res.order?.id?.slice(0, 8)} has been placed.`,
                [
                  {
                    text: 'View Orders',
                    onPress: () => navigation.navigate('OrdersTab'),
                  },
                ]
              );
            } else {
              Alert.alert('Checkout Failed', res.message);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#cbd5e1" />
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <CustomButton
            title="Start Shopping"
            onPress={() => navigation.navigate('HomeTab')}
            style={styles.shopNowBtn}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            onRefresh={refreshCart}
            refreshing={loading}
            renderItem={({ item }) => (
              <View style={[styles.itemCard, SHADOWS.small]}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.product?.name}
                  </Text>
                  <Text style={styles.unitPrice}>
                    ${Number(item.product?.price).toFixed(2)} each
                  </Text>
                  <Text style={styles.subtotalText}>
                    Subtotal: ${Number(item.total_price).toFixed(2)}
                  </Text>
                </View>

                {/* Quantity Controls & Delete */}
                <View style={styles.actionCol}>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={styles.deleteBtn}
                  >
                    <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                  </TouchableOpacity>

                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Ionicons name="remove" size={16} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Ionicons name="add" size={16} color={COLORS.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          {/* Checkout Footer */}
          <View style={[styles.checkoutBar, SHADOWS.medium]}>
            <View style={styles.priceSummary}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>${Number(totalPrice).toFixed(2)}</Text>
            </View>

            <CustomButton
              title="Proceed to Checkout"
              onPress={handleCheckout}
              loading={checkingOut}
              style={styles.checkoutBtn}
              icon={<Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" />}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 110,
    gap: 12,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusMd,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  unitPrice: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  subtotalText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 8,
  },
  actionCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    padding: 6,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: SIZES.radiusSm,
    padding: 2,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 10,
    color: COLORS.text,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  priceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  checkoutBtn: {
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 16,
  },
  authSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  authBtn: {
    minWidth: 180,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  shopNowBtn: {
    minWidth: 160,
  },
});

export default CartScreen;

