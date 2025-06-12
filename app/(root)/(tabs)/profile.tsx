import UpdateProfileFrom from '@/components/modules/auth/updateprofile/UpdateProfileFrom';
import { useUser } from '@/context/UserContext';
import { logout } from '@/services/AuthService';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { user, setIsLoading } = useUser();
console.log('user in profile', user);
  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (user) {
      router.push('/login');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f3f4f6] px-4 pt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-xl font-semibold text-gray-800">
            Welcome, {user?.name || 'User'}
          </Text>
          <Text className="text-sm text-gray-500">{user?.email}</Text>
        </View>
        <TouchableOpacity
          onPress={handleLogOut}
          className="bg-red-500 px-4 py-2 rounded-full shadow"
        >
          <View className="flex-row items-center">
            <Ionicons name="log-out-outline" size={16} color="#fff" />
            <Text className="text-white text-sm ml-2">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Role Info */}
      <View className="mb-4 bg-white p-4 rounded-xl shadow-sm">
        <Text className="text-gray-500 mb-1">Role</Text>
        <Text className="text-lg font-medium text-gray-800">
          {user?.role || 'N/A'}
        </Text>
      </View>

      {/* Update Profile Form */}
      <View className="flex-1">
        <UpdateProfileFrom />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
