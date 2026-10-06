import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import CustomButton from '../../components/CustomButton';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import LoginScreen from '../auth/LoginScreen';

const ProfileScreen = ({ navigation }) => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginScreen navigation={navigation} />;
  }

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card */}
        <View style={[styles.profileCard, SHADOWS.small]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.userName}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Contact & Address Info */}
        <View style={[styles.infoCard, SHADOWS.small]}>
          <Text style={styles.sectionTitle}>Account Details</Text>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color={COLORS.textMuted} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>
                {user?.phone_number || 'Not provided'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={COLORS.textMuted} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Shipping Address</Text>
              <Text style={styles.infoValue}>
                {user?.address || 'No default address saved'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Menu Options */}
        <View style={[styles.menuCard, SHADOWS.small]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="person-outline" size={22} color={COLORS.primary} />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('OrdersTab')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="receipt-outline" size={22} color={COLORS.primary} />
              <Text style={styles.menuText}>My Orders</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuLeft}>
              <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
              <Text style={[styles.menuText, { color: COLORS.danger }]}>
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
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 16,
    gap: 16,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusMd,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusMd,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
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
    color: COLORS.textMuted,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: SIZES.radiusMd,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    fontWeight: '600',
    color: COLORS.text,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 16,
  },
});

export default ProfileScreen;

