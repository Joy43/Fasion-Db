import { View, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const AccountManage = () => {
  const navigation = useNavigation();
  return (
    <View className="">
      <View className="flex-row items-center justify-between px-4 py-3  shadow-md">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">
          Account Setting
        </Text>
        <View className="w-8" />
      </View>
    </View>
  );
};

export default AccountManage;
