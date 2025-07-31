import UpdateProfileForm from "@/components/modules/auth/updateprofile/UpdateProfileFrom";
import Userprofile from "@/components/modules/auth/userprofile/Userprofile";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, setIsLoading } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (user) {
      router.push("/login");
    }
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafb] px-5 pt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-extrabold text-gray-900">
            Hello, {user?.name || "User"}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">{user?.email}</Text>
        </View>
        <TouchableOpacity
          onPress={handleLogOut}
          className="flex-row items-center bg-red-500 px-4 py-2 rounded-full shadow-md active:opacity-80"
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text className="text-white text-sm font-medium ml-2">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info Card */}
      <View className="bg-white p-5 rounded-2xl shadow-sm mb-6">
        <View className="mb-4">
          <Text className="text-sm text-gray-500">Role</Text>
          <Text className="text-lg font-semibold text-gray-800">
            {user?.role || "N/A"}
          </Text>
        </View>

        {/* Edit Profile */}
        <TouchableOpacity
          onPress={openModal}
          className="bg-blue-600 py-3 px-6 rounded-full active:opacity-90"
        >
          <Text className="text-white font-semibold text-base text-center">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={closeModal}
      >
        <SafeAreaView className="flex-1 bg-white px-5 pt-6">
          <UpdateProfileForm closeModal={closeModal} />
        </SafeAreaView>
      </Modal>

      {/* Additional Info */}
      <Userprofile />
    </SafeAreaView>
  );
};

export default Profile;
