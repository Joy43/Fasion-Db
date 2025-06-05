import { getUserProfile } from '@/services/AuthService';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type UserProfile = {
  name?: string;
  photo?: string;
 
};

const HomeProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
 

  useEffect(() => {
    const fetchProfile = async () => {
     
      const result = await getUserProfile();
      if (result.success) {
        setProfile(result.data);
      } else {
        console.warn('Failed to load profile:', result.message);
      }
     
    };

    fetchProfile();
  }, []);

 

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Image
            source={{ uri: profile?.photo || 'https://i.pravatar.cc/150?img=3' }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <TouchableOpacity className="bg-blue-500 px-4 py-1.5 rounded-full">
            <Text className="text-white font-semibold">My Activity</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row space-x-4">
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons name="settings-outline" size={24} color="black" />
        </View>
      </View>

      {/* Greeting */}
      <Text className="text-2xl font-bold mb-4">Hello, {profile?.name || 'User'}!</Text>

      {/* Announcement */}
      <View className="flex-row justify-between items-center bg-gray-200 rounded-xl p-4 mb-6">
        <View>
          <Text className="text-sm font-semibold mb-1">Announcement</Text>
          <Text className="text-xs text-gray-600">
            All shop here now you can shop here...
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Recently Viewed */}
      <Text className="text-lg font-semibold mb-3">Recently viewed</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Image
            key={item}
            source={{ uri: `https://i.pravatar.cc/100?img=${item + 10}` }}
            className="w-14 h-14 rounded-full mr-3"
          />
        ))}
      </ScrollView>

      {/* My Orders */}
      <Text className="text-lg font-semibold mb-3">My Orders</Text>
      <View className="flex-row justify-between space-x-2">
        <TouchableOpacity className="bg-blue-100 px-4 py-2 rounded-full">
          <Text className="text-blue-700 font-semibold">To Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-100 px-4 py-2 rounded-full flex-row items-center space-x-2">
          <View className="w-2 h-2 bg-green-500 rounded-full" />
          <Text className="text-blue-700 font-semibold">To Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-100 px-4 py-2 rounded-full">
          <Text className="text-blue-700 font-semibold">To Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeProfile;
