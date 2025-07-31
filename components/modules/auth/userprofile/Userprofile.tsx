import { getUserProfile } from "@/services/AuthService";
import { IUserProfile } from "@/types/userprofile";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const Userprofile = () => {
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

  return (
    <ScrollView>
      <Text className="text-xl font-bold mb-4 text-center">User Details</Text>

      {/* Profile Image */}
      {profile?.profile?.photo ? (
        <Image
          source={{ uri: profile.profile.photo }}
          className="w-16 h-16 rounded-full"
          resizeMode="cover"
        />
      ) : (
        <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
          <Text className="text-xs text-gray-600">No Photo</Text>
        </View>
      )}

      {/* Profile Information */}
      <Text className="text-lg font-semibold mb-2">Profile Information</Text>

      <Text className="mb-1">
        <Text className="font-semibold">Email:</Text> {profile?.email}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">Gender:</Text>{" "}
        {profile?.profile?.gender}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">Phone:</Text>{" "}
        {profile?.profile?.phoneNo}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">Address:</Text>{" "}
        {profile?.profile?.address}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">DOB:</Text>{" "}
        {profile?.profile?.dateOfBirth}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">Role:</Text> {profile?.role}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">Has Shop:</Text>{" "}
        {profile?.hasShop ? "Yes" : "No"}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">Active:</Text>{" "}
        {profile?.isActive ? "Yes" : "No"}
      </Text>
      <Text className="mb-4">
        <Text className="font-semibold">Last Login:</Text> {profile?.lastLogin}
      </Text>

      {/* Client Info */}
      <Text className="text-lg font-bold mb-2">Client Info</Text>
      <Text className="mb-1">
        <Text className="font-semibold">Device:</Text>{" "}
        {profile?.clientInfo?.device}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">PC Name:</Text>{" "}
        {profile?.clientInfo?.pcName}
      </Text>
      <Text className="mb-1">
        <Text className="font-semibold">OS:</Text> {profile?.clientInfo?.os}
      </Text>
    </ScrollView>
  );
};

export default Userprofile;
