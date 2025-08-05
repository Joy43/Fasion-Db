import UpdateProfileForm from "@/components/modules/auth/updateprofile/UpdateProfileFrom";
import Userprofile from "@/components/modules/auth/userprofile/Userprofile";
import LoginForm from "@/components/modules/auth/login/LoginFrom";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";

import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, setIsLoading } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // --------------if no user, return LoginForm-------------------------------
  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white px-5 pt-6">
        <LoginForm />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f9fafb] px-5 pt-6">
      {/* Additional Info */}
      <Userprofile />
    </SafeAreaView>
  );
};

export default Profile;
