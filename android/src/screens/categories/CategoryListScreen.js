import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../../api/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

const CategoryListScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await apiClient.get('/categories/');
      const data = res.data.results || res.data;
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch categories:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCategories();
  };

  if (loading && !refreshing) {
    return <LoadingSpinner message="Loading Categories..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryCard, SHADOWS.small]}
            onPress={() =>
              navigation.navigate('CategoryProducts', {
                categoryId: item.id,
                categoryName: item.name,
              })
            }
          >
            <View style={styles.iconCircle}>
              <Ionicons name="grid" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{item.name}</Text>
              {item.description ? (
                <Text style={styles.categoryDesc} numberOfLines={1}>
                  {item.description}
                </Text>
              ) : null}
              <Text style={styles.productCount}>
                {item.product_count || 0} Products available
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
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
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusMd,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  categoryDesc: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  productCount: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default CategoryListScreen;

