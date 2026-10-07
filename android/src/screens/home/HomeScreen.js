import React, { useState, useEffect } from 'react';
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
import { SIZES, SHADOWS } from '../../constants/theme';
import { useCart } from '../../context/CartContext';
import { useAppTheme } from '../../context/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { cartItemCount } = useCart();
  const { theme, isDarkMode, toggleTheme } = useAppTheme();

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
      {/* Top Brand Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandContainer}>
          <View style={[styles.logoIcon, { backgroundColor: theme.primaryLight }]}>
            <Ionicons name="bag-handle" size={22} color={theme.primary} />
          </View>
          <View>
            <Text style={[styles.brandTitle, { color: theme.text }]}>
              Dokan<Text style={{ color: theme.primary }}>ly</Text>
            </Text>
            <Text style={[styles.brandSubtitle, { color: theme.textMuted }]}>
              Discover & Shop Quality
            </Text>
          </View>
        </View>

        <View style={styles.topActions}>
          {/* Theme Toggle Button */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
              size={20}
              color={isDarkMode ? '#fbbf24' : theme.text}
            />
          </TouchableOpacity>

          {/* Cart Quick Button */}
          <TouchableOpacity
            style={[
              styles.actionBtn,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={() => navigation.navigate('CartTab')}
          >
            <Ionicons name="cart-outline" size={20} color={theme.text} />
            {cartItemCount > 0 && (
              <View style={[styles.cartBadge, { backgroundColor: theme.primary }]}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: theme.inputBg,
            borderColor: theme.border,
          },
          theme.mode === 'light' && SHADOWS.light,
        ]}
      >
        <Ionicons name="search-outline" size={19} color={theme.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search products, brands, categories..."
          placeholderTextColor={theme.mode === 'dark' ? '#64748b' : '#94a3b8'}
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Horizontal Filter Pills */}
      <View style={styles.categoriesSection}>
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Categories
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategoriesTab')}>
            <Text style={[styles.seeAllText, { color: theme.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: null, name: 'All Products' }, ...categories]}
          keyExtractor={(item) => (item.id !== null ? item.id.toString() : 'all')}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.id;
            return (
              <TouchableOpacity
                onPress={() => handleCategorySelect(item.id)}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.surface,
                    borderColor: isSelected ? theme.primary : theme.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    {
                      color: isSelected ? '#ffffff' : theme.textMuted,
                      fontWeight: isSelected ? '700' : '600',
                    },
                  ]}
                >
                  {item.name}
                  {item.product_count !== undefined && !isSelected
                    ? ` (${item.product_count})`
                    : ''}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 12, marginBottom: 8 }]}>
        {selectedCategory ? 'Filtered Products' : 'Featured Products'}
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return <LoadingSpinner message="Fetching Dokanly catalog..." />;
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
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
            colors={[theme.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="basket-outline" size={56} color={theme.textMuted} />
            <Text style={[styles.emptyText, { color: theme.textMuted }]}>
              No products found matching your search.
            </Text>
            <TouchableOpacity
              style={[styles.resetBtn, { backgroundColor: theme.primaryLight }]}
              onPress={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                fetchProducts(null, '');
              }}
            >
              <Text style={[styles.resetBtnText, { color: theme.primary }]}>
                Clear All Filters
              </Text>
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
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  headerContainer: {
    paddingTop: 12,
    paddingBottom: 6,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
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
    fontWeight: '800',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  categoriesSection: {
    marginBottom: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    paddingHorizontal: 4,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryList: {
    paddingVertical: 2,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
  },
  categoryPillText: {
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 15,
    textAlign: 'center',
  },
  resetBtn: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: SIZES.radiusSm,
  },
  resetBtnText: {
    fontWeight: '700',
    fontSize: 13,
  },
});

export default HomeScreen;
