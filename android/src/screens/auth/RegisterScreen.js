import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: '',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMessage('');
  };

  const handleRegister = async () => {
    const { email, password, confirm_password, first_name, last_name, phone_number, address } = formData;

    if (!email.trim() || !password || !first_name.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Password).');
      return;
    }

    if (password !== confirm_password) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await register({
      email: email.trim(),
      password,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      phone_number: phone_number.trim(),
      address: address.trim(),
    });
    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Dokanly to start shopping</Text>
        </View>

        {!!errorMessage && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.danger} />
            <Text style={styles.errorBoxText}>{errorMessage}</Text>
          </View>
        )}

        <View style={styles.row}>
          <CustomInput
            label="First Name *"
            placeholder="John"
            value={formData.first_name}
            onChangeText={(t) => handleChange('first_name', t)}
            style={{ flex: 1, marginRight: 8 }}
          />
          <CustomInput
            label="Last Name"
            placeholder="Doe"
            value={formData.last_name}
            onChangeText={(t) => handleChange('last_name', t)}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </View>

        <CustomInput
          label="Email Address *"
          placeholder="example@email.com"
          iconName="mail-outline"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(t) => handleChange('email', t)}
        />

        <CustomInput
          label="Phone Number"
          placeholder="+880 1700 000000"
          iconName="call-outline"
          keyboardType="phone-pad"
          value={formData.phone_number}
          onChangeText={(t) => handleChange('phone_number', t)}
        />

        <CustomInput
          label="Delivery Address"
          placeholder="Street address, City, Country"
          iconName="location-outline"
          multiline
          numberOfLines={2}
          value={formData.address}
          onChangeText={(t) => handleChange('address', t)}
        />

        <CustomInput
          label="Password *"
          placeholder="Create strong password"
          iconName="lock-closed-outline"
          secureTextEntry
          value={formData.password}
          onChangeText={(t) => handleChange('password', t)}
        />

        <CustomInput
          label="Confirm Password *"
          placeholder="Re-enter password"
          iconName="shield-checkmark-outline"
          secureTextEntry
          value={formData.confirm_password}
          onChangeText={(t) => handleChange('confirm_password', t)}
        />

        <CustomButton
          title="Register & Login"
          onPress={handleRegister}
          loading={loading}
          style={styles.registerBtn}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    padding: 12,
    borderRadius: SIZES.radiusMd,
    marginBottom: 16,
    gap: 8,
  },
  errorBoxText: {
    color: COLORS.danger,
    fontSize: 14,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  registerBtn: {
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

export default RegisterScreen;

