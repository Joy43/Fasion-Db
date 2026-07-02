import { useUser } from '@/context/UserContext';
import { useProfile } from '@/hooks/useProfile';
import { logout } from '@/services/AuthService';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpdateProfileForm from '../updateprofile/UpdateProfileFrom';
import Modal from 'react-native-modal';

const Userprofile = () => {
  const { user, setIsLoading } = useUser();
  const { data: profile, isLoading, isError } = useProfile();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    router.push('/login');
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#7A1CAC" />
        <Text className="mt-3 text-sm font-medium text-gray-500">Loading profile details...</Text>
      </View>
    );
  }

  if (isError || !profile) {
    return (
      <View className="flex-1 items-center justify-center p-6 bg-gray-50">
        <View className="bg-red-50 p-4 rounded-full mb-3">
          <Feather name="alert-circle" size={32} color="#EF4444" />
        </View>
        <Text className="text-red-600 text-lg font-bold text-center">
          Failed to load profile data
        </Text>
        <Text className="text-gray-500 text-sm text-center mt-1">
          Please check your connection and try again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50/50" contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Profile Area */}
      <View className="bg-white rounded-b-[40px] pt-12 pb-8 px-6 shadow-sm border-b border-gray-100 items-center">
        {/* Logout and Action Row */}
        <View className="w-full flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold text-gray-800">My Profile</Text>
          <TouchableOpacity
            onPress={handleLogOut}
            className="flex-row items-center bg-red-50 px-4 py-2 rounded-full border border-red-100 active:opacity-75"
          >
            <Ionicons name="log-out-outline" size={16} color="#EF4444" />
            <Text className="text-red-500 text-xs font-semibold ml-1.5">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Avatar */}
        <View className="relative mb-4">
          <View className="p-1 bg-white rounded-full shadow-lg">
            {profile?.profile?.photo ? (
              <Image
                source={{ uri: profile.profile.photo }}
                className="w-28 h-28 rounded-full"
                resizeMode="cover"
              />
            ) : (
              <View className="w-28 h-28 rounded-full bg-purple-50 items-center justify-center">
                <Text className="text-2xl font-bold text-purple-700">
                  {(user?.name || 'U').charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          {/* Edit Icon Overlay */}
          <TouchableOpacity
            onPress={openModal}
            className="absolute bottom-1 right-1 bg-purple-700 p-2.5 rounded-full border-2 border-white shadow-lg active:opacity-85"
          >
            <Feather name="edit-2" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Name and Tag */}
        <Text className="text-2xl font-black text-gray-900 mb-1">
          {user?.name || 'User'}
        </Text>
        <View className="flex-row items-center bg-purple-50 px-3 py-1 rounded-full">
          <View className="w-2 h-2 rounded-full bg-purple-600 mr-2" />
          <Text className="text-purple-700 text-xs font-bold uppercase tracking-wider">
            {profile?.isActive ? 'Active Member' : 'Inactive'}
          </Text>
        </View>
      </View>

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={{ margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <SafeAreaView className="flex-1 bg-white px-5 pt-6">
          <UpdateProfileForm closeModal={closeModal} />
        </SafeAreaView>
      </Modal>

      <View className="px-5 pt-6">
        {/* Profile Info Card */}
        <View className="mb-6">
          <Text className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
            Personal Information
          </Text>
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <InfoItem icon="mail" label="Email Address" value={profile?.email} />
            <InfoItem icon="user" label="Gender" value={profile?.profile?.gender} />
            <InfoItem icon="phone" label="Phone Number" value={profile?.profile?.phoneNo} />
            <InfoItem icon="map-pin" label="Address" value={profile?.profile?.address} />
            <InfoItem icon="calendar" label="Date of Birth" value={profile?.profile?.dateOfBirth} />
            <InfoItem icon="clock" label="Last Login" value={profile?.lastLogin} isLast />
          </View>
        </View>

        {/* Device Info Card */}
        <View className="mb-6">
          <Text className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
            Security & Device Logs
          </Text>
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <InfoItem icon="smartphone" label="Device Type" value={profile?.clientInfo?.device} />
            <InfoItem icon="monitor" label="System Name" value={profile?.clientInfo?.pcName} />
            <InfoItem icon="globe" label="Browser" value={profile?.clientInfo?.browser} />
            <InfoItem icon="cpu" label="User Agent" value={profile?.clientInfo?.userAgent} isLast />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
  isLast = false,
}: {
  icon: string;
  label: string;
  value?: string | null | boolean;
  isLast?: boolean;
}) => (
  <View className={`flex-row items-center py-3 ${isLast ? '' : 'border-b border-gray-100'}`}>
    <View className="bg-purple-50/70 p-2 rounded-xl mr-3">
      <Feather name={icon as any} size={16} color="#7A1CAC" />
    </View>
    <View className="flex-1">
      <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
        {label}
      </Text>
      <Text className="text-sm font-semibold text-gray-800">
        {value?.toString() || 'N/A'}
      </Text>
    </View>
  </View>
);

export default Userprofile;

