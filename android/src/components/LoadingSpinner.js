import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

const LoadingSpinner = ({ message = 'Loading...', size = 'large' }) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator size={size} color={theme.primary} />
      {message && (
        <Text style={[styles.text, { color: theme.textMuted }]}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoadingSpinner;
