import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { SIZES } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const { theme } = useAppTheme();
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
              <Ionicons name="bag-handle" size={40} color={theme.primary} />
            </View>
            <Text style={[styles.brandTitle, { color: theme.text }]}>
              Dokan<Text style={{ color: theme.primary }}>ly</Text>
            </Text>
            <Text style={[styles.subtitle, { color: theme.textMuted }]}>
              Sign in to manage your orders & cart
            </Text>
          </View>

          {!!errorMessage && (
            <View
              style={[
                styles.errorBox,
                {
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  borderColor: theme.danger,
                },
              ]}
            >
              <Ionicons name="alert-circle" size={20} color={theme.danger} />
              <Text style={[styles.errorBoxText, { color: theme.danger }]}>
                {errorMessage}
              </Text>
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
              <Text style={[styles.footerText, { color: theme.textMuted }]}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.linkText, { color: theme.primary }]}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    borderRadius: SIZES.radiusMd,
    marginBottom: 16,
    gap: 8,
  },
  errorBoxText: {
    fontSize: 14,
    flex: 1,
    fontWeight: '500',
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
  },
  linkText: {
    fontSize: 14,
    fontWeight: '800',
  },
});

export default LoginScreen;
