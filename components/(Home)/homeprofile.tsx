import { getUserProfile } from "@/services/AuthService";
import { IUserProfile } from "@/types/userprofile";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeProfile = () => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getUserProfile();
      if (result.success) {
        setProfile(result.data);
      } else {
        console.warn("Failed to load profile:", result.message);
      }
    };
    fetchProfile();
  }, []);
  console.log("Profile data:", profile);

  return (
    <SafeAreaView className="flex-1 bg-white px-4 mt-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        {/* Left side: profile photo + button */}
        <View className="flex-row items-center space-x-4 gap-3">
          {/* Profile photo or placeholder */}
          {profile?.profile?.photo ? (
            <Image
              source={{ uri: profile.profile.photo }}
              className="w-12 h-12 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-12 h-12 rounded-full bg-gray-300 items-center justify-center">
              <Text className="text-xs text-gray-600">profile</Text>
            </View>
          )}

          {/* My Activity button */}
          <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-full">
            <Text className="text-white font-semibold">My Activity</Text>
          </TouchableOpacity>
        </View>

        {/* Right side: icons */}
        <View className="flex-row space-x-4 gap-3">
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Ionicons name="settings-outline" size={24} color="black" />
        </View>
      </View>

      {/* Greeting */}
      <Text className="text-2xl font-bold mb-4">
        Hello, {profile?.name || "User"}!
      </Text>

      {/* Announcement */}
      <View className="flex-row justify-between items-center bg-gray-200 rounded-xl p-4 mb-6">
        <View>
          <Text className="text-xl font-semibold mb-1">Announcement</Text>
          <Text className="text-lg text-gray-900">
            All shop here now you can shop here...
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={28} color="blue" />
        </TouchableOpacity>
      </View>

      {/*------------ My Orders----------------- */}
      <Text className="text-lg p-2 font-semibold ">My Shops</Text>
      <View className="flex-row justify-between space-x-2 space-y-4">
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
    </SafeAreaView>
  );
};

export default HomeProfile;
