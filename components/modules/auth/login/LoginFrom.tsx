import { loginUser } from '@/services/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await loginUser(data);
      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: result.message || 'You have logged in successfully!',
        });
        router.push('/home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: result.message || 'Invalid email or password.',
        });
      }
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please try again later.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white px-6 justify-center"
    >
      <View className="w-full max-w-md self-center">
        <Text className="text-4xl font-bold text-center text-indigo-600 mb-2">Welcome Back 👋</Text>
        <Text className="text-center text-gray-500 mb-6">Log in to your account</Text>

        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 shadow-sm"
              />
              {errors.email && (
                <Text className="text-red-500 mt-1">{errors.email.message}</Text>
              )}
            </View>
          )}
        />

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <TextInput
                placeholder="Password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 bg-gray-50 rounded-xl px-4 py-3 shadow-sm"
              />
              {errors.password && (
                <Text className="text-red-500 mt-1">{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        {/* Login Button */}
        <TouchableOpacity
          className={`bg-indigo-600 rounded-xl py-3 mt-2 ${isSubmitting ? 'opacity-50' : ''}`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-base">Login</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-2 text-gray-400 text-sm">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Signup CTA */}
        <Text className="text-center text-gray-600">
          Don't have an account?{' '}
          <Text
            className="text-indigo-600 font-semibold"
            onPress={() => router.push('/register')}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
