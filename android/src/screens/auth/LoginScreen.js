import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
    setErrorMessage('');
    setLoading(true);

    const result = await login(email.trim(), password);
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
          <View style={styles.iconCircle}>
            <Ionicons name="bag-handle" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.brandTitle}>Dokanly</Text>
          <Text style={styles.subtitle}>Sign in to continue your shopping</Text>
        </View>

        {!!errorMessage && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.danger} />
            <Text style={styles.errorBoxText}>{errorMessage}</Text>
          </View>
        )}

        <View style={styles.form}>
          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            iconName="mail-outline"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage('');
            }}
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            iconName="lock-closed-outline"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage('');
            }}
          />

          <CustomButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginBtn}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Create Account</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 6,
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
  form: {
    width: '100%',
  },
  loginBtn: {
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
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

export default LoginScreen;

