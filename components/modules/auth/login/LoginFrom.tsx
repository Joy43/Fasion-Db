import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid, Platform as RNPlatform } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import Toast from 'react-native-toast-message';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { jwtDecode } from 'jwt-decode';
import messaging, { getMessaging, getToken, requestPermission, AuthorizationStatus } from '@react-native-firebase/messaging';
import { useLoginMutation, setCredentials, useAppDispatch } from '@/redux';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const getMessagingInstance = () => {
  return typeof getMessaging === 'function' ? getMessaging() : (messaging as any)();
};

const getFcmToken = async (): Promise<string | undefined> => {
  try {
    if (RNPlatform.OS === 'android' && RNPlatform.Version >= 33) {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (status !== PermissionsAndroid.RESULTS.GRANTED) return undefined;
    }
    const messagingInstance = getMessagingInstance();
    const authStatus = await (requestPermission ? requestPermission(messagingInstance) : messagingInstance.requestPermission());
    const enabled =
      authStatus === (AuthorizationStatus ? AuthorizationStatus.AUTHORIZED : (messaging as any).AuthorizationStatus.AUTHORIZED) ||
      authStatus === (AuthorizationStatus ? AuthorizationStatus.PROVISIONAL : (messaging as any).AuthorizationStatus.PROVISIONAL);
    if (enabled) return await (getToken ? getToken(messagingInstance) : messagingInstance.getToken());
  } catch {}
  return undefined;
};

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log('🔑 [Login Attempt] Form input data:', { email: data.email });
      const fcmToken = await getFcmToken();
      const loginPayload = {
        email: data.email.trim().toLowerCase(),
        password: data.password,
        ...(fcmToken ? { fcmToken } : {}),
      };
      console.log('📡 [Login Attempt] Sending payload to API:', { 
        email: loginPayload.email, 
        hasPassword: !!loginPayload.password, 
        hasFcmToken: !!fcmToken 
      });
      
      const result = await login(loginPayload).unwrap();
      console.log('📥 [Login Response] Successful login result:', result);

      if (result.success && result.data?.accessToken) {
        const decoded: any = jwtDecode(result.data.accessToken);
        console.log('🔓 [Login Response] Decoded JWT Token:', decoded);

        dispatch(setCredentials({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
          user: {
            userId: decoded.userId || decoded.id || '',
            email: decoded.email || data.email,
            role: decoded.role || 'user',
            name: decoded.name,
          },
        }));
        Toast.show({ type: 'success', text1: 'Login Successful' });
        router.push('/home');
      } else {
        console.warn('⚠️ [Login Failed] Result did not indicate success or missing accessToken:', result);
        Toast.show({ type: 'error', text1: 'Login Failed', text2: result.message || 'Invalid credentials.' });
      }
    } catch (err: any) {
      console.error('❌ [Login Error] API request threw an error:', err);
      if (err?.data) {
         console.error('❌ [Login Error Detail] Response data:', err.data);
      }
      Toast.show({ type: 'error', text1: 'Error', text2: err?.data?.message || 'Please try again later.' });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-background px-6 justify-center"
    >
      {/* Top Illustration */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dkqdwcguu/image/upload/v1754007752/undraw_adventure_map_hnin_2_1_lfwsve.png',
          }}
          style={{ width: 150, height: 150, resizeMode: 'contain' }}
        />
      </View>

      {/* Welcome Text */}
      <Text className="text-3xl font-bold text-center text-text mb-1">
        <Text className="text-accent">W</Text>elcome back
      </Text>
      <Text className="text-center text-secondaryText mb-6">
        sign in to access your account
      </Text>

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex-row items-center bg-surface border border-border rounded-xl px-4 mb-4">
            <MaterialIcons name="email" size={20} color="#6B7280" />
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="flex-1 py-4 px-3 text-[15px] text-text"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        )}
      />
      {errors.email && (
        <Text className="text-error -mt-3 mb-2">{errors.email.message}</Text>
      )}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex-row items-center bg-surface border border-border rounded-xl px-4 mb-4">
            <Feather name="lock" size={20} color="#6B7280" />
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="flex-1 py-4 px-3 text-[15px] text-text"
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
        )}
      />
      {errors.password && (
        <Text className="text-error -mt-3 mb-2">
          {errors.password.message}
        </Text>
      )}

      {/* Remember Me & Forgot Password */}
      <View className="flex-row justify-between items-center mb-4 px-1">
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          className="flex-row items-center"
        >
          <View
            className={`w-5 h-5 rounded border mr-2 ${
              rememberMe ? 'bg-accent border-accent' : 'border-border bg-surface'
            } items-center justify-center`}
          >
            {rememberMe && <Feather name="check" size={14} color="#111827" />}
          </View>
          <Text className="text-xs text-secondaryText">Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/')}>
          <Text className="text-xs text-accent font-semibold">Forgot password ?</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className={`bg-primary rounded-xl py-4 active:opacity-90 shadow-sm ${
          isLoading ? 'opacity-60' : ''
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-surface text-center font-bold text-[16px]">
            Login Now ➔
          </Text>
        )}
      </TouchableOpacity>

      {/* Bottom Register */}
      <View className="mt-6 items-center">
        <Text className="text-sm text-secondaryText">
          New member?{' '}
          <Text
            className="text-accent font-semibold"
            onPress={() => router.push('/register')}
          >
            Register now
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
