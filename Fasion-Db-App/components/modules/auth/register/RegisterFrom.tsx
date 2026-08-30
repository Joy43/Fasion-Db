import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { jwtDecode } from 'jwt-decode';
import { useRegisterMutation, setCredentials, useAppDispatch } from '@/redux';

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const [register, { isLoading: loading }] = useRegisterMutation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: string, value: string | boolean) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!form.agree)
      return Alert.alert('Terms', 'You must agree to the terms.');

    if (!form.name || !form.email || !form.password) {
      return Alert.alert('Missing Fields', 'All fields are required.');
    }

    try {
      const result = await register({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      }).unwrap();

      if (result?.success && result.data?.accessToken) {
        const decoded: any = jwtDecode(result.data.accessToken);
        dispatch(setCredentials({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
          user: {
            userId: decoded.userId || decoded.id || '',
            email: decoded.email || form.email,
            role: decoded.role || 'user',
            name: decoded.name || form.name,
          },
        }));
        Toast.show({ type: 'success', text1: 'Account created successfully!' });
        router.push('/login');
      } else {
        Toast.show({ type: 'error', text1: result?.message || 'Registration failed.' });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      Toast.show({ type: 'error', text1: error?.data?.message || 'Unexpected error occurred.' });
    }
  };

  return (
    <SafeAreaView className="py-6 bg-background flex-1 justify-center px-6">
      <View className="items-center mb-6">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dkqdwcguu/image/upload/v1754007752/undraw_adventure_map_hnin_2_1_lfwsve.png',
          }}
          style={{ width: 150, height: 150, resizeMode: 'contain' }}
        />
      </View>

      <Text className="text-3xl font-bold text-center text-text mb-1">Get Started</Text>
      <Text className="text-center text-secondaryText mb-6">
        by creating a free account.
      </Text>

      {/* Full Name */}
      <View className="flex-row items-center bg-surface rounded-xl px-4 py-3 mb-4 border border-border">
        <Feather
          name="user"
          size={18}
          color="#6B7280"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Full name"
          value={form.name}
          onChangeText={(val) => handleChange('name', val)}
          className="flex-1 text-text"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Email */}
      <View className="flex-row items-center bg-surface rounded-xl px-4 py-3 mb-4 border border-border">
        <Feather
          name="mail"
          size={18}
          color="#6B7280"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Valid email"
          value={form.email}
          onChangeText={(val) => handleChange('email', val)}
          className="flex-1 text-text"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Password */}
      <View className="flex-row items-center bg-surface rounded-xl px-4 py-3 mb-4 border border-border">
        <Feather
          name="lock"
          size={18}
          color="#6B7280"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Strong password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          value={form.password}
          onChangeText={(val) => handleChange('password', val)}
          className="flex-1 text-text"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>

      {/* Terms Checkbox */}
      <View className="flex-row items-center mb-6 px-1">
        <TouchableOpacity
          onPress={() => handleChange('agree', !form.agree)}
          style={{ marginRight: 8 }}
        >
          <Feather
            name={form.agree ? 'check-square' : 'square'}
            size={20}
            color={form.agree ? '#D4AF37' : '#6B7280'}
          />
        </TouchableOpacity>
        <Text className="text-sm text-secondaryText flex-1">
          By checking the box you agree to our policy{' '}
          <Text className="text-accent font-semibold">Terms</Text> and{' '}
          <Text className="text-accent font-semibold">Conditions</Text>
        </Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        className="bg-primary px-8 py-4 rounded-xl flex-row justify-center items-center active:opacity-90 shadow-sm"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text className="text-surface font-bold text-lg mr-2">
              Create Account
            </Text>
            <Feather name="arrow-right" size={20} color="#fff" />
          </>
        )}
      </TouchableOpacity>

      {/* Footer */}
      <Text className="text-center text-secondaryText mt-4">
        Already a member?{' '}
        <Text
          className="text-accent font-semibold"
          onPress={() => router.push('/login')}
        >
          Login in
        </Text>
      </Text>
    </SafeAreaView>
  );
}
