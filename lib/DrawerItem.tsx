// components/DrawerItem.tsx
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

interface DrawerItemProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  href?: string;
  onPress?: () => void;
}

const DrawerItem = ({ icon, label, href, onPress }: DrawerItemProps) => {
  const content = (
    <View className="p-4 border-b border-gray-100 flex-row items-center">
      <Feather name={icon} size={20} color="gray" />
      <Text className="ml-3 text-lg">{label}</Text>
    </View>
  );

  if (href) {
    return (
      <Link href={href as any} asChild>
        <TouchableOpacity>{content}</TouchableOpacity>
      </Link>
    );
  }

  return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
};

export default DrawerItem;
