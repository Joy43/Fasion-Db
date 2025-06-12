import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { registerUser } from '@/services/AuthService';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Feather from 'react-native-vector-icons/Feather';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChange = (key: string, value: string | boolean) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (!form.agree) return Alert.alert("Terms", "You must agree to the terms.");
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return Alert.alert("Missing Fields", "All fields are required.");
    }
    if (form.password !== form.confirmPassword) {
      return Alert.alert("Password Error", "Passwords do not match.");
    }

    setLoading(true);
    const result = await registerUser({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });
    setLoading(false);

    if (result.success) {
      Alert.alert("Success", "Registration successful!", [
        { text: "OK", onPress: () => router.push('/home') }
      ]);
    } else {
      Alert.alert("Registration Failed", result.message || "Something went wrong.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-center relative">
      <View className="items-center mb-8">
        <Text className="text-4xl font-bold text-orange-600">G</Text>
      </View>

      <Text className="text-2xl font-bold mb-1">Create Account</Text>
      <Text className="text-gray-500 mb-4">Please create your account</Text>

      <TextInput
        placeholder="Enter Name"
        value={form.name}
        onChangeText={(val) => handleChange('name', val)}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-3 bg-gray-100"
      />
      <TextInput
        placeholder="Enter Email"
        value={form.email}
        onChangeText={(val) => handleChange('email', val)}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-3 bg-gray-100"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View className="relative mb-3">
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={(val) => handleChange('password', val)}
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-100"
        />
        <TouchableOpacity
          className="absolute right-4 top-4"
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <View className="relative mb-3">
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          value={form.confirmPassword}
          onChangeText={(val) => handleChange('confirmPassword', val)}
          className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-100"
        />
        <TouchableOpacity
          className="absolute right-4 top-4"
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mb-4">
        <TouchableOpacity
          className="mr-2"
          onPress={() => handleChange('agree', !form.agree)}
        >
          <Feather
            name={form.agree ? 'check-square' : 'square'}
            size={22}
            color={form.agree ? '#f97316' : '#aaa'}
          />
        </TouchableOpacity>
        <Text className="ml-2 text-gray-600">
          I agree to the{' '}
          <Text className="text-black font-semibold">Terms & Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-xl mb-6"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center text-white font-semibold text-lg">
            Register
          </Text>
        )}
      </TouchableOpacity>

      <Text className="text-center text-gray-600">
        Already have an account?{' '}
        <Text
          className="text-orange-500 font-semibold"
          onPress={() => router.push('/login')}
        >
          Sign in
        </Text>
      </Text>
    </SafeAreaView>
  );
}
