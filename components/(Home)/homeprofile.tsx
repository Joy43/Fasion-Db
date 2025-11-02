import { getUserProfile } from '@/services/AuthService';
import { IUserProfile } from '@/types/userprofile';
import { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import Announcement from './Annoucement';

const HomeProfile = () => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const handleAnnouncementPress = (announcement: any) => {
    console.log('Announcement pressed:', announcement);
    // Navigate to announcement details
    // navigation.navigate('AnnouncementDetails', { announcement });
  };

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

  // ---------Settings Drawer Modal---------------
  const SettingsDrawer = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={drawerVisible}
      onRequestClose={() => setDrawerVisible(false)}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50"
        activeOpacity={1}
        onPress={() => setDrawerVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="absolute right-0 top-16 bottom-62 w-80 bg-white"
          onPress={(e) => e.stopPropagation()}
        >
          <SafeAreaView className="flex-1">
            <ScrollView>
              {/*----------- Header ----------- */}
              <View className="p-4 border-b border-gray-200 bg-green-600 flex-row justify-between items-center">
                <Text className="text-xl font-bold text-white">Settings</Text>
                <TouchableOpacity onPress={() => setDrawerVisible(false)}>
                  <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {/*-----------Menu Items -----------*/}
              <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
                <Feather name="home" size={20} color="gray" />
                <Text className="ml-3 text-lg">Home</Text>
              </TouchableOpacity>

              <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
                <Feather name="user" size={20} color="gray" />
                <Text className="ml-3 text-lg">Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
                <Feather name="settings" size={20} color="gray" />
                <Text className="ml-3 text-lg">Account Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
                <Feather name="lock" size={20} color="gray" />
                <Text className="ml-3 text-lg">Privacy</Text>
              </TouchableOpacity>

              <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
                <Feather name="bell" size={20} color="gray" />
                <Text className="ml-3 text-lg">Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity className="p-4 border-b border-gray-100 flex-row items-center">
                <Feather name="help-circle" size={20} color="gray" />
                <Text className="ml-3 text-lg">Help & Support</Text>
              </TouchableOpacity>

              {/*----- Logout--------- */}
              <View className="p-4 mt-auto">
                <TouchableOpacity className="p-3 bg-green-500 rounded-lg flex-row items-center justify-center">
                  <Feather name="log-out" size={20} color="white" />
                  <Text className="ml-2 text-white font-semibold">Logout</Text>
                </TouchableOpacity>
              </View>

              {/* -------Close Button------------ */}
              <TouchableOpacity
                className="absolute top-4 right-4"
                onPress={() => setDrawerVisible(false)}
              >
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  // -------------- Notifications Modal
  const NotificationsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={notificationsVisible}
      onRequestClose={() => setNotificationsVisible(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl h-4/5">
          <SafeAreaView className="flex-1">
            <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-xl font-bold">Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationsVisible(false)}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              <View className="bg-blue-50 p-4 rounded-lg mb-3 flex-row items-start">
                <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
                  <Feather name="bell" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold mb-1">New Order Received</Text>
                  <Text className="text-gray-600 text-sm">
                    You have a new order #12345
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    2 hours ago
                  </Text>
                </View>
              </View>

              <View className="bg-green-50 p-4 rounded-lg mb-3 flex-row items-start">
                <View className="w-10 h-10 bg-green-500 rounded-full items-center justify-center mr-3">
                  <Feather name="check-circle" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold mb-1">Payment Confirmed</Text>
                  <Text className="text-gray-600 text-sm">
                    Your payment has been processed
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    5 hours ago
                  </Text>
                </View>
              </View>

              <View className="bg-yellow-50 p-4 rounded-lg mb-3 flex-row items-start">
                <View className="w-10 h-10 bg-yellow-500 rounded-full items-center justify-center mr-3">
                  <Feather name="alert-circle" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold mb-1">Update Available</Text>
                  <Text className="text-gray-600 text-sm">
                    New version is ready to install
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">1 day ago</Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          {/* Left side: profile photo + button */}
          <View className="flex-row items-center gap-3">
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

            <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-full">
              <Text className="text-white font-semibold">My Profile</Text>
            </TouchableOpacity>
          </View>

          {/*----- Right side: icons -------*/}
          <View className="flex-row gap-3">
            <TouchableOpacity onPress={() => setNotificationsVisible(true)}>
              <Feather name="bell" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDrawerVisible(true)}>
              <Feather name="settings" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting */}
        <Text className="text-2xl font-bold mb-4">
          Hello, {profile?.name || 'User'}!
        </Text>

        {/* -------------Announcement */}

        <Announcement
          autoChangeInterval={5000} // Change every 5 seconds
          onAnnouncementPress={handleAnnouncementPress}
          onToPayPress={() => console.log('To Pay')}
          onToReceivePress={() => console.log('To Receive')}
          onToReviewPress={() => console.log('To Review')}
        />
      </ScrollView>

      {/* Modals */}
      <SettingsDrawer />
      <NotificationsModal />
    </SafeAreaView>
  );
};

export default HomeProfile;
