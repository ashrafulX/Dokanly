import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../../api/client';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { cartItemCount } = useCart();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    await Promise.all([fetchCategories(), fetchProducts()]);
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await apiClient.get('/categories/');
      // Django rest framework nested / pagination might return array or results
      const data = res.data.results || res.data;
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  const fetchProducts = async (catId = selectedCategory, search = searchQuery) => {
    try {
      const params = {};
      if (catId) params.category_id = catId;
      if (search.trim()) params.search = search.trim();

      const res = await apiClient.get('/products/', { params });
      const data = res.data.results || res.data;
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchCategories(), fetchProducts(selectedCategory, searchQuery)]);
    setRefreshing(false);
  };

  const handleCategorySelect = (id) => {
    const newSelected = selectedCategory === id ? null : id;
    setSelectedCategory(newSelected);
    fetchProducts(newSelected, searchQuery);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    fetchProducts(selectedCategory, text);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Top Banner */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.brand}>Dokanly Store 🛍️</Text>
        </View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate('CartTab')}
        >
          <Ionicons name="cart-outline" size={24} color={COLORS.text} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={[styles.searchBox, SHADOWS.small]}>
        <Ionicons name="search-outline" size={20} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products, brands..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Pills */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: null, name: 'All' }, ...categories]}
          keyExtractor={(item) => (item.id !== null ? item.id.toString() : 'all')}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.id;
            return (
              <TouchableOpacity
                onPress={() => handleCategorySelect(item.id)}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    isSelected && styles.categoryPillTextActive,
                  ]}
                >
                  {item.name}
                  {item.product_count !== undefined && !isSelected ? ` (${item.product_count})` : ''}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 16, marginBottom: 8 }]}>
        {selectedCategory ? 'Filtered Products' : 'Popular Products'}
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return <LoadingSpinner message="Fetching Dokanly catalog..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#cbd5e1" />
            <Text style={styles.emptyText}>No products found.</Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                fetchProducts(null, '');
              }}
            >
              <Text style={styles.resetBtnText}>Clear Filters</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  greeting: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  brand: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  cartIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.danger,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: COLORS.text,
  },
  categoriesSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  categoryList: {
    paddingVertical: 4,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  categoryPillTextActive: {
    color: '#ffffff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textMuted,
  },
  resetBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.radiusSm,
  },
  resetBtnText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default HomeScreen;

