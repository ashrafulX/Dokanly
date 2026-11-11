import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dokanly_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever cart updates
  useEffect(() => {
    try {
      localStorage.setItem('dokanly_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync cart to localStorage', e);
    }
  }, [cart]);

  // Add Item to Cart
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += Number(quantity);
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            product,
            quantity: Number(quantity) || 1,
          },
        ];
      }
    });
  };

  // Update Item Quantity
  const updateQuantity = (productId, newQuantity) => {
    const qty = Number(newQuantity);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  // Remove Item from Cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Clear Entire Cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('dokanly_cart');
  };

  // Total Item Count
  const cartCount = cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);

  // Total Subtotal Amount
  const totalAmount = cart.reduce((sum, item) => {
    const price = parseFloat(item.product?.price) || 0;
    return sum + price * (Number(item.quantity) || 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
