// components/SettingsDrawer.tsx
import React from "react";
import { Modal, TouchableOpacity, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import DrawerItem from "./DrawerItem";

interface SettingsDrawerProps {
  visible: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const SettingsDrawer = ({ visible, onClose, onLogout }: SettingsDrawerProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableOpacity className="flex-1 bg-black/50" activeOpacity={1} onPress={onClose}>
        <TouchableOpacity
          activeOpacity={1}
          className="absolute right-0 top-0 bottom-0 w-80 bg-white"
          onPress={(e) => e.stopPropagation()}
        >
          <SafeAreaView className="flex-1">
            <ScrollView>
              {/* Header */}
              <View className="p-4 border-b border-gray-200 bg-green-600 flex-row justify-between items-center">
                <Text className="text-xl font-bold text-white">Settings</Text>
                <TouchableOpacity onPress={onClose}>
                  <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {/* Menu Items */}
              <DrawerItem icon="home" label="Home" href="/" />
              <DrawerItem icon="user" label="Profile" href="/profile" />
              <DrawerItem icon="settings" label="Account Settings" href="/settings/account" />
              <DrawerItem icon="lock" label="Privacy" href="/settings/privacy" />
              <DrawerItem icon="bell" label="Notifications" href="/settings/notifications" />
              <DrawerItem icon="help-circle" label="Help & Support" href="/settings/help" />

              {/* Logout */}
              <View className="p-4 mt-6">
                <TouchableOpacity
                  onPress={onLogout}
                  className="p-3 bg-green-500 rounded-lg flex-row items-center justify-center"
                >
                  <Feather name="log-out" size={20} color="white" />
                  <Text className="ml-2 text-white font-semibold">Logout</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default SettingsDrawer;
