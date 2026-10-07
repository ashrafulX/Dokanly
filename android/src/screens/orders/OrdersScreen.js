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
import { useAppTheme } from '../../context/ThemeContext';
import CustomButton from '../../components/CustomButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { SIZES, SHADOWS } from '../../constants/theme';

const OrdersScreen = ({ navigation }) => {
  const { isAuthenticated } = useAuth();
  const { theme } = useAppTheme();
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
        return { bg: 'rgba(16, 185, 129, 0.12)', text: theme.accent };
      case 'Shipped':
      case 'Ready To Ship':
        return { bg: theme.primaryLight, text: theme.primary };
      case 'Canceled':
        return { bg: 'rgba(239, 68, 68, 0.12)', text: theme.danger };
      case 'Not Paid':
      default:
        return { bg: 'rgba(245, 158, 11, 0.12)', text: theme.warning };
    }
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <View style={[styles.authIconCircle, { backgroundColor: theme.primaryLight }]}>
          <Ionicons name="receipt" size={36} color={theme.primary} />
        </View>
        <Text style={[styles.authTitle, { color: theme.text }]}>Track Your Orders</Text>
        <Text style={[styles.authSubtitle, { color: theme.textMuted }]}>
          Sign in to view your order history, delivery statuses, and receipts.
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
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
              style={[
                styles.orderCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
                theme.mode === 'light' && SHADOWS.light,
              ]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('OrderDetail', { order: item })}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={[styles.orderIdText, { color: theme.text }]}>
                    Order #{item.id.slice(0, 8).toUpperCase()}
                  </Text>
                  <Text style={[styles.orderDate, { color: theme.textMuted }]}>
                    {formattedDate}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={[styles.cardDivider, { backgroundColor: theme.border }]} />

              <View style={styles.cardFooter}>
                <Text style={[styles.itemsSummary, { color: theme.textMuted }]}>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </Text>
                <Text style={[styles.totalPrice, { color: theme.primary }]}>
                  ${Number(item.total_price).toFixed(2)}
                </Text>
              </View>

              {item.status !== 'Canceled' && item.status !== 'Delivered' && (
                <View style={[styles.actionRow, { borderTopColor: theme.border }]}>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => handleCancelOrder(item.id)}
                  >
                    <Text style={[styles.cancelBtnText, { color: theme.danger }]}>
                      Cancel Order
                    </Text>
                  </TouchableOpacity>
                  <Ionicons name="chevron-forward" size={17} color={theme.textMuted} />
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
              <Ionicons name="bag-check-outline" size={56} color={theme.textMuted} />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>No Orders Yet</Text>
            <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
              You haven't placed any orders yet. Discover our items and order now!
            </Text>
            <CustomButton
              title="Start Shopping"
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
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  orderCard: {
    borderRadius: SIZES.radiusMd,
    padding: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderIdText: {
    fontSize: 15,
    fontWeight: '800',
  },
  orderDate: {
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  cardDivider: {
    height: 1,
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsSummary: {
    fontSize: 13,
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '900',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  cancelBtn: {
    paddingVertical: 4,
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 24,
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
  },
});

export default OrdersScreen;
