import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { SIZES, SHADOWS } from '../../constants/theme';
import { useAppTheme } from '../../context/ThemeContext';

const OrderDetailScreen = ({ route }) => {
  const { order } = route.params;
  const { theme } = useAppTheme();

  const formattedDate = new Date(order.created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Info */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            theme.mode === 'light' && SHADOWS.light,
          ]}
        >
          <Text style={[styles.orderTitle, { color: theme.text }]}>
            Order #{order.id.slice(0, 8).toUpperCase()}
          </Text>
          <Text style={[styles.fullId, { color: theme.textMuted }]}>
            ID: {order.id}
          </Text>
          <Text style={[styles.orderDate, { color: theme.textMuted }]}>
            Placed on: {formattedDate}
          </Text>

          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: theme.text }]}>
              Status:
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: theme.primaryLight }]}>
              <Text style={[styles.statusBadgeText, { color: theme.primary }]}>
                {order.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            theme.mode === 'light' && SHADOWS.light,
          ]}
        >
          <Text style={[styles.sectionHeading, { color: theme.text }]}>
            Ordered Items
          </Text>
          {order.items?.map((item) => (
            <View
              key={item.id}
              style={[styles.itemRow, { borderBottomColor: theme.border }]}
            >
              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, { color: theme.text }]}>
                  {item.product?.name}
                </Text>
                <Text style={[styles.itemSubtext, { color: theme.textMuted }]}>
                  Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                </Text>
              </View>
              <Text style={[styles.itemTotal, { color: theme.text }]}>
                ${Number(item.total_price).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* Pricing Summary */}
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.text }]}>
              Grand Total
            </Text>
            <Text style={[styles.summaryTotal, { color: theme.primary }]}>
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
  },
  container: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: SIZES.radiusMd,
    padding: 18,
    borderWidth: 1,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  fullId: {
    fontSize: 12,
    marginTop: 2,
  },
  orderDate: {
    fontSize: 13,
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
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
  },
  statusBadgeText: {
    fontWeight: '800',
    fontSize: 13,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemDetails: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemSubtext: {
    fontSize: 12,
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '800',
  },
  summaryTotal: {
    fontSize: 22,
    fontWeight: '900',
  },
});

export default OrderDetailScreen;
