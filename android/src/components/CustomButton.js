import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

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
  const getBackgroundColor = () => {
    if (disabled) return '#cbd5e1';
    switch (variant) {
      case 'secondary':
        return COLORS.secondary;
      case 'danger':
        return COLORS.danger;
      case 'outline':
        return 'transparent';
      case 'primary':
      default:
        return COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') return COLORS.primary;
    return '#ffffff';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outlineButton,
        variant !== 'outline' && !disabled && SHADOWS.small,
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
  outlineButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;

