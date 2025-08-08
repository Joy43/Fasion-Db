import { useNotificationSocket } from "@/hooks/useNotification";
import React from "react";
import { View, Text } from "react-native";

interface NotificationProps {
  userId: string | null;
}

const Notification: React.FC<NotificationProps> = ({ userId }) => {
  const { notification } = useNotificationSocket(userId);

  if (!notification) return null;

  return (
    <View className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-4 rounded">
      <Text className="font-bold mb-1">Success</Text>
      <Text>{notification}</Text>
    </View>
  );
};

export default Notification;
