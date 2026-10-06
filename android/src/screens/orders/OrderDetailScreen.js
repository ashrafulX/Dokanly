import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const OrderDetailScreen = ({ route }) => {
  const { order } = route.params;

  const formattedDate = new Date(order.created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Info */}
        <View style={[styles.card, SHADOWS.small]}>
          <Text style={styles.orderTitle}>
            Order #{order.id.slice(0, 8).toUpperCase()}
          </Text>
          <Text style={styles.fullId}>Full ID: {order.id}</Text>
          <Text style={styles.orderDate}>Placed on: {formattedDate}</Text>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Current Status:</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{order.status}</Text>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View style={[styles.card, SHADOWS.small]}>
          <Text style={styles.sectionHeading}>Order Items</Text>
          {order.items?.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product?.name}</Text>
                <Text style={styles.itemSubtext}>
                  Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                ${Number(item.total_price).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          {/* Pricing Summary */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.summaryTotal}>
              ${Number(order.total_price).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusMd,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  fullId: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  orderDate: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 8,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
  },
  statusBadgeText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  itemDetails: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemSubtext: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  summaryTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
});

export default OrderDetailScreen;

