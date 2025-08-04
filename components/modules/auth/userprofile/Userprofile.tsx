import { useUser } from "@/context/UserContext";
import { useProfile } from "@/hooks/useProfile";
import { logout } from "@/services/AuthService";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UpdateProfileForm from "../updateprofile/UpdateProfileFrom";
import Modal from "react-native-modal";

const Userprofile = () => {
  const { user, setIsLoading } = useUser();
  const { data: profile, isLoading, isError } = useProfile();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    router.push("/login");
  };

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
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-extrabold text-gray-900">
            Hello, {user?.name || "User"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogOut}
          className="flex-row items-center bg-red-500 px-4 py-2 rounded-full shadow-md active:opacity-80"
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text className="text-white text-sm font-medium ml-2">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View className="items-center mb-6">
        <View className="relative">
          {profile?.profile?.photo ? (
            <Image
              source={{ uri: profile.profile.photo }}
              className="w-28 h-28 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-28 h-28 rounded-full bg-gray-300 items-center justify-center">
              <Text className="text-xs text-gray-600">No Photo</Text>
            </View>
          )}

          {/* Edit Icon Overlay */}
          <TouchableOpacity
            onPress={openModal}
            className="absolute bottom-1 right-1 bg-red-600 p-2 rounded-full border border-white shadow-md active:opacity-80"
          >
            <Feather name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={{ margin: 0 }}
      >
        <SafeAreaView className="flex-1 bg-white px-5 pt-6">
          <UpdateProfileForm closeModal={closeModal} />
        </SafeAreaView>
      </Modal>

      {/* Profile Info */}
      <Text className="text-xl font-semibold mb-2 text-red-600">
        Profile Information
      </Text>
      <InfoItem label="Email" value={profile?.email} />
      <InfoItem label="Gender" value={profile?.profile?.gender} />
      <InfoItem label="Phone" value={profile?.profile?.phoneNo} />
      <InfoItem label="Address" value={profile?.profile?.address} />
      <InfoItem label="DOB" value={profile?.profile?.dateOfBirth} />
      <InfoItem label="Active" value={profile?.isActive ? "Yes" : "No"} />
      <InfoItem label="Last Login" value={profile?.lastLogin} />

      {/* Device Info */}
      <Text className="text-xl font-semibold mt-6 mb-2 text-red-400">
        Device Information
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
  value?: string | null | boolean;
}) => (
  <Text className="mb-1 text-base">
    <Text className="font-semibold text-gray-800">{label}:</Text>{" "}
    <Text className="text-gray-600">{value?.toString() || "N/A"}</Text>
  </Text>
);

export default Userprofile;
