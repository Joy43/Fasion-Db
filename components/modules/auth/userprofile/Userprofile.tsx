import { useProfile } from "@/hooks/useProfile";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const Userprofile = () => {
  const { data: profile, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#7A1CAC" />
        <Text className="mt-2 text-gray-500">Loading profile...</Text>
      </View>
    );
  }

  if (isError || !profile) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-red-500 text-lg font-semibold">
          Failed to load profile data.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-2">
      <Text className="text-2xl font-bold mb-6 text-center text-purple-700">
        User Profile
      </Text>

      {/* Profile Image */}
      {profile?.profile?.photo ? (
        <Image
          source={{ uri: profile.profile.photo }}
          className="w-24 h-24 rounded-full mx-auto mb-4"
          resizeMode="cover"
        />
      ) : (
        <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center mx-auto mb-4">
          <Text className="text-xs text-gray-600">No Photo</Text>
        </View>
      )}

      {/* Profile Info */}
      <Text className="text-xl font-semibold mb-2 text-purple-600">
        Profile Information
      </Text>

      <InfoItem label="Email" value={profile?.email} />
      <InfoItem label="Gender" value={profile?.profile?.gender} />
      <InfoItem label="Phone" value={profile?.profile?.phoneNo} />
      <InfoItem label="Address" value={profile?.profile?.address} />
      <InfoItem label="DOB" value={profile?.profile?.dateOfBirth} />
      <InfoItem label="Active" value={profile?.isActive ? "Yes" : "No"} />
      <InfoItem label="Last Login" value={profile?.lastLogin} />

      {/* Client Info */}
      <Text className="text-xl font-semibold mt-6 mb-2 text-purple-600">
        Client Information
      </Text>
      <InfoItem label="Device" value={profile?.clientInfo?.device} />
      <InfoItem label="PC Name" value={profile?.clientInfo?.pcName} />
    </ScrollView>
  );
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <Text className="mb-1 text-base">
    <Text className="font-semibold text-gray-800">{label}:</Text>{" "}
    <Text className="text-gray-600">{value || "N/A"}</Text>
  </Text>
);

export default Userprofile;
