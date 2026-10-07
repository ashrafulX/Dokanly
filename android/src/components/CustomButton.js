import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SIZES, SHADOWS } from '../constants/theme';
import { useAppTheme } from '../context/ThemeContext';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary', // primary | secondary | outline | danger
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const { theme } = useAppTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.mode === 'dark' ? '#334155' : '#e2e8f0';
    switch (variant) {
      case 'secondary':
        return theme.secondary;
      case 'danger':
        return theme.danger;
      case 'outline':
        return 'transparent';
      case 'primary':
      default:
        return theme.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.mode === 'dark' ? '#64748b' : '#94a3b8';
    if (variant === 'outline') return theme.primary;
    return '#ffffff';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && {
          borderWidth: 1.5,
          borderColor: theme.primary,
        },
        variant === 'primary' && !disabled && SHADOWS.medium,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && icon}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: SIZES.radiusMd,
    gap: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default CustomButton;
