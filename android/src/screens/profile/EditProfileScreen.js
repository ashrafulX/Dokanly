import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateProfile } = useAuth();
  const { theme } = useAppTheme();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone_number: user?.phone_number || '',
    address: user?.address || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.first_name.trim()) {
      Alert.alert('Validation', 'First name cannot be empty.');
      return;
    }

    setLoading(true);
    const res = await updateProfile({
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      phone_number: formData.phone_number.trim(),
      address: formData.address.trim(),
    });
    setLoading(false);

    if (res.success) {
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Error', res.message || 'Failed to update profile.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <CustomInput
            label="First Name"
            value={formData.first_name}
            onChangeText={(v) => handleChange('first_name', v)}
          />

          <CustomInput
            label="Last Name"
            value={formData.last_name}
            onChangeText={(v) => handleChange('last_name', v)}
          />

          <CustomInput
            label="Phone Number"
            value={formData.phone_number}
            onChangeText={(v) => handleChange('phone_number', v)}
            keyboardType="phone-pad"
          />

          <CustomInput
            label="Delivery Address"
            value={formData.address}
            onChangeText={(v) => handleChange('address', v)}
            multiline
            numberOfLines={3}
          />

          <CustomButton
            title="Save Changes"
            onPress={handleSave}
            loading={loading}
            style={styles.saveBtn}
          />
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
  scrollContent: {
    padding: 20,
  },
  saveBtn: {
    marginTop: 16,
  },
});

export default EditProfileScreen;
