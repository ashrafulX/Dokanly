import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import { SIZES, SHADOWS } from '../../constants/theme';
import LoginScreen from '../auth/LoginScreen';

const ProfileScreen = ({ navigation }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, isDarkMode, toggleTheme } = useAppTheme();

  if (!isAuthenticated) {
    return <LoginScreen navigation={navigation} />;
  }

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of Dokanly?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.first_name
      ? user.first_name[0].toUpperCase()
      : 'U';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            theme.mode === 'light' && SHADOWS.light,
          ]}
        >
          <View style={[styles.avatar, { backgroundColor: theme.primaryLight }]}>
            <Text style={[styles.avatarText, { color: theme.primary }]}>{initials}</Text>
          </View>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text style={[styles.userEmail, { color: theme.textMuted }]}>{user?.email}</Text>
        </View>

        {/* Preferences (Dark Mode Switch) */}
        <View
          style={[
            styles.menuCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            theme.mode === 'light' && SHADOWS.light,
          ]}
        >
          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons
                name={isDarkMode ? 'moon' : 'sunny'}
                size={22}
                color={theme.primary}
              />
              <Text style={[styles.menuText, { color: theme.text }]}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#cbd5e1', true: theme.primaryLight }}
              thumbColor={isDarkMode ? theme.primary : '#ffffff'}
            />
          </View>
        </View>

        {/* Contact & Address Info */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            theme.mode === 'light' && SHADOWS.light,
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Account Details</Text>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={theme.textMuted} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Phone Number</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {user?.phone_number || 'Not provided'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={theme.textMuted} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoLabel, { color: theme.textMuted }]}>Shipping Address</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {user?.address || 'No default address saved'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Menu Options */}
        <View
          style={[
            styles.menuCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
            theme.mode === 'light' && SHADOWS.light,
          ]}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="person-outline" size={22} color={theme.primary} />
              <Text style={[styles.menuText, { color: theme.text }]}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.menuDivider, { backgroundColor: theme.border }]} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('OrdersTab')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="receipt-outline" size={22} color={theme.primary} />
              <Text style={[styles.menuText, { color: theme.text }]}>My Orders</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <View style={[styles.menuDivider, { backgroundColor: theme.border }]} />

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuLeft}>
              <Ionicons name="log-out-outline" size={22} color={theme.danger} />
              <Text style={[styles.menuText, { color: theme.danger }]}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 14,
  },
  profileCard: {
    borderRadius: SIZES.radiusMd,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '900',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
  },
  userEmail: {
    fontSize: 14,
    marginTop: 4,
  },
  infoCard: {
    borderRadius: SIZES.radiusMd,
    padding: 18,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  menuCard: {
    borderRadius: SIZES.radiusMd,
    paddingVertical: 4,
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '700',
  },
  menuDivider: {
    height: 1,
    marginHorizontal: 16,
  },
});

export default ProfileScreen;
