import { useAppDispatch, useAppSelector, useGetProfileQuery, logout } from '@/redux';
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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => !!state.auth.accessToken);
  const { data: profileData, isLoading, isError } = useGetProfileQuery(undefined, { skip: !isAuthenticated });
  const profile = profileData?.data;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleLogOut = () => {
    dispatch(logout());
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
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 120, alignItems: 'center' }}>
      <View className="w-full max-w-xl md:max-w-4xl px-4">
        {/* Top Navigation Header */}
        <View className="flex-row justify-between items-center pt-12 pb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-surface p-2.5 rounded-full shadow-sm border border-border"
          >
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          
          <Text className="text-xl font-bold text-text">Profile</Text>

          <TouchableOpacity
            onPress={handleLogOut}
            className="bg-red-50 p-2.5 rounded-full border border-red-100 active:opacity-75"
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* Avatar and Info Section */}
        <View className="items-center mt-4 mb-6">
          <View className="relative items-center justify-center">
            {/* Circular progress/gradient ring effect */}
            <View className="w-32 h-32 rounded-full border-4 border-accent/30 items-center justify-center p-1">
              <View className="w-full h-full rounded-full border-2 border-accent p-0.5 bg-surface shadow-sm overflow-hidden">
                {profile?.profile?.photo ? (
                  <Image
                    source={{ uri: profile.profile.photo }}
                    className="w-full h-full rounded-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-full rounded-full bg-background items-center justify-center">
                    <Text className="text-3xl font-extrabold text-accent">
                      {(user?.name || 'U').charAt(0).toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Badge at the bottom center of the avatar */}
            <View className="absolute -bottom-2.5 bg-accent px-5 py-1 rounded-full border-2 border-surface shadow-sm">
              <Text className="text-primary text-[11px] font-bold uppercase tracking-wider">
                {profile?.isActive ? 'Pro' : 'Free'}
              </Text>
            </View>
          </View>

          {/* User Details */}
          <Text className="text-2xl font-bold text-text mt-6 mb-1">
            {user?.name || 'User'}
          </Text>
          <Text className="text-sm font-semibold text-secondaryText">
            {profile?.email}
          </Text>
        </View>

        {/* Profile Details Grid Cards */}
        <View className="mb-6">
          <View className="flex-row flex-wrap justify-between">
            <GridCard
              icon="user"
              label="Gender"
              value={profile?.profile?.gender || 'N/A'}
              color="purple"
            />
            <GridCard
              icon="calendar"
              label="Date of Birth"
              value={profile?.profile?.dateOfBirth || 'N/A'}
              color="blue"
            />
            <GridCard
              icon="phone"
              label="Phone"
              value={profile?.profile?.phoneNo || 'N/A'}
              color="green"
            />
            <GridCard
              icon="map-pin"
              label="Address"
              value={profile?.profile?.address || 'N/A'}
              color="orange"
            />
          </View>
        </View>

        {/* Menu / List Section */}
        <View className="mb-4">
          <View className="bg-surface rounded-3xl p-3 shadow-sm border border-border">
            <MenuItem
              icon="edit-3"
              label="Edit Profile"
              onPress={openModal}
            />
            <MenuItem
              icon="bell"
              label="Notification Settings"
              onPress={() => router.push('/(root)/(tabs)/home')}
            />
            <MenuItem
              icon="shield"
              label="Device & Security Log"
              value={profile?.clientInfo?.device || 'Unknown'}
              isLast
              onPress={() => {}}
            />
          </View>
        </View>
      </View>

      {/* Modal for editing */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={{ margin: 0 }}
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <SafeAreaView className="flex-1 bg-surface px-5 pt-6">
          <UpdateProfileForm closeModal={closeModal} />
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};

/* Grid Card Helper Component */
const GridCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  color: 'purple' | 'blue' | 'green' | 'orange';
}) => {
  // Vibrant theme colors for card icons
  const colors = {
    purple: { bg: 'bg-purple-50/80', text: '#7A1CAC' },
    blue: { bg: 'bg-blue-50/80', text: '#004CFF' },
    green: { bg: 'bg-green-50/80', text: '#10B981' },
    orange: { bg: 'bg-orange-50/80', text: '#F59E0B' },
  };

  return (
    <View className="w-[48%] md:w-[23.5%] bg-surface rounded-3xl p-5 mb-4 border border-border shadow-sm flex-row items-center">
      {/* Icon with colored background */}
      <View className={`${colors[color].bg} p-3 rounded-2xl mr-3.5`}>
        <Feather name={icon as any} size={18} color={colors[color].text} />
      </View>
      <View className="flex-1">
        <Text className="text-[10px] font-bold text-secondaryText uppercase tracking-wide mb-1">
          {label}
        </Text>
        <Text className="text-sm font-bold text-text" numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
};

/* Menu Item Helper Component */
const MenuItem = ({
  icon,
  label,
  value,
  isLast = false,
  onPress,
}: {
  icon: string;
  label: string;
  value?: string;
  isLast?: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-row items-center justify-between p-3.5 ${isLast ? '' : 'border-b border-border'}`}
  >
    <View className="flex-row items-center">
      <View className="bg-background p-2.5 rounded-xl mr-3.5">
        <Feather name={icon as any} size={18} color="#6B7280" />
      </View>
      <Text className="text-sm font-semibold text-text">{label}</Text>
    </View>
    <View className="flex-row items-center">
      {value && <Text className="text-xs text-secondaryText mr-2 font-medium">{value}</Text>}
      <Feather name="chevron-right" size={16} color="#9CA3AF" />
    </View>
  </TouchableOpacity>
);

export default Userprofile;

