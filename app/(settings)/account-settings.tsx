import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const AccountSetting = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-10 left-4 z-50 bg-white/70 p-2 rounded-full"
      > <Ionicons name="arrow-back" size={24} color="black" />
    
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountSetting;
