import LoginForm from '@/components/modules/auth/login/LoginFrom';
import React from 'react';
import { SafeAreaView } from 'react-native';

const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <LoginForm />
    </SafeAreaView>
  );
};

export default LoginScreen;
