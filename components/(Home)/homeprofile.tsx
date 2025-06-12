import { getUserProfile } from '@/services/AuthService';
import { IUserProfile } from '@/types/userprofile';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeProfile = () => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  // console.log('Profile data:', profile);

  return (
    <SafeAreaView className="flex-1 bg-white px-4 mt-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Image
            source={{ uri: profile?.photo || 'https://i.pravatar.cc/150?img=3' }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <TouchableOpacity
            className="bg-blue-500 px-4 py-1.5 rounded-full"
            onPress={() => setModalVisible(true)}
          >
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

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-xl p-6 w-11/12 max-h-[80%]">
            <ScrollView>
              <Text className="text-xl font-bold mb-4">User Details</Text>
              <View className="flex-row items-center mb-4">
             <Image
  source={{ uri: profile?.photo }}
  style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16 }}
/>
                </View>
              <Text className="text-lg font-semibold mb-2">Profile Information</Text>
                <Text className="text-lg font-semibold">{profile?.name}</Text>
              <Text><Text className="font-semibold">Name:</Text> {profile?.name}</Text>
              <Text><Text className="font-semibold">Email:</Text> {profile?.email}</Text>
              <Text><Text className="font-semibold">Gender:</Text> {profile?.profile?.gender}</Text>
              <Text><Text className="font-semibold">Phone:</Text> {profile?.profile?.phoneNo}</Text>
              <Text><Text className="font-semibold">Address:</Text> {profile?.profile?.address}</Text>
              <Text><Text className="font-semibold">DOB:</Text> {profile?.profile?.dateOfBirth}</Text>
              <Text><Text className="font-semibold">Role:</Text> {profile?.role}</Text>
              <Text><Text className="font-semibold">Has Shop:</Text> {profile?.hasShop ? 'Yes' : 'No'}</Text>
              <Text><Text className="font-semibold">Active:</Text> {profile?.isActive ? 'Yes' : 'No'}</Text>
              <Text><Text className="font-semibold">Last Login:</Text> {profile?.lastLogin}</Text>

              <Text className="mt-4 font-bold">Client Info</Text>
              <Text><Text className="font-semibold">Device:</Text> {profile?.clientInfo?.device}</Text>
              <Text><Text className="font-semibold">Browser:</Text> {profile?.clientInfo?.browser}</Text>
              <Text><Text className="font-semibold">IP Address:</Text> {profile?.clientInfo?.ipAddress}</Text>
              <Text><Text className="font-semibold">PC Name:</Text> {profile?.clientInfo?.pcName}</Text>
              <Text><Text className="font-semibold">OS:</Text> {profile?.clientInfo?.os}</Text>
              <Text><Text className="font-semibold">User Agent:</Text> {profile?.clientInfo?.userAgent}</Text>
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 bg-red-500 py-2 rounded-full"
            >
              <Text className="text-white text-center font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeProfile;
