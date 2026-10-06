import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const OrdersScreen = ({ navigation }) => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const res = await apiClient.get('/orders/');
      const data = res.data.results || res.data;
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const handleCancelOrder = (orderId) => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiClient.post(`/orders/${orderId}/cancel/`);
              Alert.alert('Order Cancelled', 'Your order has been cancelled.');
              fetchOrders();
            } catch (error) {
              console.error('Cancel order error:', error);
              Alert.alert('Error', 'Could not cancel this order.');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return { bg: '#dcfce7', text: COLORS.accent };
      case 'Shipped':
      case 'Ready To Ship':
        return { bg: '#e0f2fe', text: COLORS.primary };
      case 'Canceled':
        return { bg: '#fee2e2', text: COLORS.danger };
      case 'Not Paid':
      default:
        return { bg: '#fef3c7', text: COLORS.warning };
    }
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Ionicons name="receipt-outline" size={64} color={COLORS.textMuted} />
        <Text style={styles.authTitle}>Track Your Orders</Text>
        <Text style={styles.authSubtitle}>
          Sign in to view your order history, delivery statuses, and invoices.
        </Text>
        <CustomButton
          title="Sign In Now"
          onPress={() => navigation.navigate('ProfileTab')}
          style={styles.authBtn}
        />
      </SafeAreaView>
    );
  }

  if (loading && !refreshing) {
    return <LoadingSpinner message="Fetching your orders..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        renderItem={({ item }) => {
          const statusStyle = getStatusColor(item.status);
          const itemCount = item.items ? item.items.length : 0;
          const formattedDate = new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <TouchableOpacity
              style={[styles.orderCard, SHADOWS.small]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('OrderDetail', { order: item })}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderIdText}>
                    Order #{item.id.slice(0, 8).toUpperCase()}
                  </Text>
                  <Text style={styles.orderDate}>{formattedDate}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.cardFooter}>
                <Text style={styles.itemsSummary}>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </Text>
                <Text style={styles.totalPrice}>
                  ${Number(item.total_price).toFixed(2)}
                </Text>
              </View>

              {item.status !== 'Canceled' && item.status !== 'Delivered' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => handleCancelOrder(item.id)}
                  >
                    <Text style={styles.cancelBtnText}>Cancel Order</Text>
                  </TouchableOpacity>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bag-check-outline" size={72} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptySubtitle}>
              You haven't placed any orders yet. Discover our items and order now!
            </Text>
            <CustomButton
              title="Shop Products"
              onPress={() => navigation.navigate('HomeTab')}
              style={{ marginTop: 16 }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusMd,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderIdText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  orderDate: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsSummary: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primary,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  cancelBtn: {
    paddingVertical: 4,
  },
  cancelBtnText: {
    fontSize: 13,
    color: COLORS.danger,
    fontWeight: '600',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 24,
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
  },
});

export default OrdersScreen;

