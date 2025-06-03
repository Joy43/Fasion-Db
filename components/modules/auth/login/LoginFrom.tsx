import { loginUser } from "@/services/AuthService";
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
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
console.log('login data',data)
    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: result.message || 'You have logged in successfully!',
      });
     
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: result.message || 'Invalid email or password.',
      });
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Please try again later.',
    });
  }
};


  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <View className="w-full max-w-md bg-gray-100 p-6 rounded-2xl shadow-lg">
        <Text className="text-3xl font-bold text-center text-indigo-700 mb-1">Welcome Back</Text>
        <Text className="text-sm text-center text-gray-600 mb-6">Login to continue</Text>

        <Text className="text-gray-700 font-medium mb-1">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 bg-white mb-1"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text className="text-red-500 mb-3">{errors.email.message}</Text>}

        <Text className="text-gray-700 font-medium mb-1">Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 bg-white mb-1"
              placeholder="Enter your password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text className="text-red-500 mb-3">{errors.password.message}</Text>}

        <TouchableOpacity
          className={`bg-indigo-600 rounded-xl py-3 mt-4 ${isSubmitting ? 'opacity-50' : ''}`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center text-base font-semibold">Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
