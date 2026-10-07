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
import { SIZES, SHADOWS } from '../../constants/theme';
import { useAppTheme } from '../../context/ThemeContext';

const CategoryListScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useAppTheme();

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
              theme.mode === 'light' && SHADOWS.light,
            ]}
            onPress={() =>
              navigation.navigate('CategoryProducts', {
                categoryId: item.id,
                categoryName: item.name,
              })
            }
          >
            <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
              <Ionicons name="grid" size={22} color={theme.primary} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={[styles.categoryName, { color: theme.text }]}>
                {item.name}
              </Text>
              {item.description ? (
                <Text style={[styles.categoryDesc, { color: theme.textMuted }]} numberOfLines={1}>
                  {item.description}
                </Text>
              ) : null}
              <Text style={[styles.productCount, { color: theme.primary }]}>
                {item.product_count || 0} Products available
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={19} color={theme.textMuted} />
          </TouchableOpacity>
        )}
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
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radiusMd,
    padding: 16,
    borderWidth: 1,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '800',
  },
  categoryDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  productCount: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
});

export default CategoryListScreen;
