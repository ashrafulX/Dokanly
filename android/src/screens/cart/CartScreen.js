import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { SIZES, SHADOWS } from '../../constants/theme';

const CartScreen = ({ navigation }) => {
  const { isAuthenticated } = useAuth();
  const { cart, loading, updateQuantity, removeFromCart, checkout, totalPrice, refreshCart } =
    useCart();
  const { theme } = useAppTheme();
  const [checkingOut, setCheckingOut] = useState(false);

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <View style={[styles.authIconCircle, { backgroundColor: theme.primaryLight }]}>
          <Ionicons name="lock-closed" size={36} color={theme.primary} />
        </View>
        <Text style={[styles.authTitle, { color: theme.text }]}>Sign In Required</Text>
        <Text style={[styles.authSubtitle, { color: theme.textMuted }]}>
          Please sign in to manage your shopping cart and place orders.
        </Text>
        <CustomButton
          title="Sign In Now"
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
      `Are you ready to place this order for $${Number(totalPrice).toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Pay',
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
                    text: 'Track Order',
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
            <Ionicons name="cart-outline" size={56} color={theme.textMuted} />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>Your Cart is Empty</Text>
          <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <CustomButton
            title="Explore Products"
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
              <View
                style={[
                  styles.itemCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                  theme.mode === 'light' && SHADOWS.light,
                ]}
              >
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={2}>
                    {item.product?.name}
                  </Text>
                  <Text style={[styles.unitPrice, { color: theme.textMuted }]}>
                    ${Number(item.product?.price).toFixed(2)} each
                  </Text>
                  <Text style={[styles.subtotalText, { color: theme.primary }]}>
                    Subtotal: ${Number(item.total_price).toFixed(2)}
                  </Text>
                </View>

                {/* Quantity Controls & Delete */}
                <View style={styles.actionCol}>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={styles.deleteBtn}
                  >
                    <Ionicons name="trash-outline" size={19} color={theme.danger} />
                  </TouchableOpacity>

                  <View
                    style={[
                      styles.quantityRow,
                      { backgroundColor: theme.surface, borderColor: theme.border },
                    ]}
                  >
                    <TouchableOpacity
                      style={[styles.qtyBtn, { backgroundColor: theme.card }]}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Ionicons name="remove" size={15} color={theme.text} />
                    </TouchableOpacity>
                    <Text style={[styles.qtyValue, { color: theme.text }]}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      style={[styles.qtyBtn, { backgroundColor: theme.card }]}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Ionicons name="add" size={15} color={theme.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          {/* Checkout Footer */}
          <View
            style={[
              styles.checkoutBar,
              {
                backgroundColor: theme.card,
                borderTopColor: theme.border,
              },
              theme.mode === 'light' && SHADOWS.light,
            ]}
          >
            <View style={styles.priceSummary}>
              <Text style={[styles.totalLabel, { color: theme.textMuted }]}>Total Amount</Text>
              <Text style={[styles.totalAmount, { color: theme.primary }]}>
                ${Number(totalPrice).toFixed(2)}
              </Text>
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
    borderRadius: SIZES.radiusMd,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '800',
  },
  unitPrice: {
    fontSize: 13,
    marginTop: 3,
  },
  subtotalText: {
    fontSize: 14,
    fontWeight: '800',
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
    borderRadius: SIZES.radiusSm,
    padding: 3,
    borderWidth: 1,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '800',
    marginHorizontal: 10,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  priceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '900',
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
  authIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  authSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 20,
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
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  shopNowBtn: {
    minWidth: 170,
  },
});

export default CartScreen;
