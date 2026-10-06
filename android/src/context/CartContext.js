import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      initCart();
    } else {
      setCart(null);
      setCartId(null);
    }
  }, [isAuthenticated]);

  const initCart = async () => {
    try {
      setLoading(true);
      let storedCartId = await AsyncStorage.getItem('@dokanly_cart_id');
      
      if (storedCartId) {
        try {
          const res = await apiClient.get(`/carts/${storedCartId}/`);
          setCart(res.data);
          setCartId(storedCartId);
          return;
        } catch (err) {
          // If stored cart not found (e.g. converted to order or expired)
          console.log('Stored cart invalid, creating a new cart.');
        }
      }

      // Create new cart
      const createRes = await apiClient.post('/carts/', {});
      const newCartId = createRes.data.id;
      setCart(createRes.data);
      setCartId(newCartId);
      await AsyncStorage.setItem('@dokanly_cart_id', newCartId);
    } catch (e) {
      console.error('Cart initialization failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = async () => {
    if (!cartId) return initCart();
    try {
      const res = await apiClient.get(`/carts/${cartId}/`);
      setCart(res.data);
    } catch (e) {
      console.error('Failed to refresh cart:', e);
      if (e.response?.status === 404) {
        initCart();
      }
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      return { success: false, requireAuth: true, message: 'Please login to add items to cart.' };
    }
    try {
      setLoading(true);
      let currentCartId = cartId;
      if (!currentCartId) {
        const createRes = await apiClient.post('/carts/', {});
        currentCartId = createRes.data.id;
        setCartId(currentCartId);
        await AsyncStorage.setItem('@dokanly_cart_id', currentCartId);
      }

      await apiClient.post(`/carts/${currentCartId}/items/`, {
        product_id: productId,
        quantity: quantity,
      });

      await refreshCart();
      return { success: true, message: 'Item added to cart!' };
    } catch (error) {
      console.error('Add to cart error:', error.response?.data || error);
      const errMsg = error.response?.data?.product_id?.[0] || 'Could not add item to cart.';
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (!cartId) return;
    try {
      if (newQuantity <= 0) {
        return removeFromCart(itemId);
      }
      await apiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
        quantity: newQuantity,
      });
      await refreshCart();
      return { success: true };
    } catch (e) {
      console.error('Update quantity error:', e);
      return { success: false, message: 'Failed to update item quantity.' };
    }
  };

  const removeFromCart = async (itemId) => {
    if (!cartId) return;
    try {
      await apiClient.delete(`/carts/${cartId}/items/${itemId}/`);
      await refreshCart();
      return { success: true };
    } catch (e) {
      console.error('Remove item error:', e);
      return { success: false, message: 'Failed to remove item.' };
    }
  };

  const checkout = async () => {
    if (!cartId) return { success: false, message: 'Cart is empty.' };
    try {
      setLoading(true);
      const res = await apiClient.post('/orders/', { cart_id: cartId });
      
      // Clear current cart reference since it's converted to order
      await AsyncStorage.removeItem('@dokanly_cart_id');
      setCartId(null);
      setCart(null);

      // Create a fresh cart for future items
      await initCart();

      return { success: true, order: res.data };
    } catch (error) {
      console.error('Checkout error:', error.response?.data || error);
      let errMsg = 'Checkout failed.';
      if (error.response?.data?.non_field_errors) {
        errMsg = error.response.data.non_field_errors[0];
      } else if (error.response?.data?.cart_id) {
        errMsg = error.response.data.cart_id[0];
      }
      return { success: false, message: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const cartItemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  const totalPrice = cart?.total_price || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        loading,
        cartItemCount,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        refreshCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

