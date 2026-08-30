import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AnnouncementData {
  id: string;
  title: string;
  message: string;
  date?: string;
}

interface AnnouncementProps {
  autoChangeInterval?: number;
  onAnnouncementPress?: (announcement: AnnouncementData) => void;
  onToPayPress?: () => void;
  onToReceivePress?: () => void;
  onToReviewPress?: () => void;
}

const Announcement: React.FC<AnnouncementProps> = ({
  autoChangeInterval = 5000,
  onAnnouncementPress,
  onToPayPress,
  onToReceivePress,
  onToReviewPress,
}) => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const demoData: AnnouncementData[] = [
        {
          id: '1',
          title: 'Welcome Offer',
          message: 'Get 20% off on your first purchase! Limited time only.',
          date: '2024-11-01',
        },
        {
          id: '2',
          title: 'New Arrivals',
          message: 'Check out our latest collection. Shop now and save big!',
          date: '2024-11-02',
        },
        {
          id: '3',
          title: 'Flash Sale',
          message: 'Flash sale this weekend! Up to 50% off on selected items.',
          date: '2024-11-03',
        },
        {
          id: '4',
          title: 'Free Shipping',
          message: 'Free shipping on all orders above $50. No code needed!',
          date: '2024-11-04',
        },
      ];

      setAnnouncements(demoData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
      setLoading(false);
    }
  };

  // Auto-change announcement
  useEffect(() => {
    if (announcements.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
      );
    }, autoChangeInterval);

    return () => clearInterval(interval);
  }, [announcements.length, autoChangeInterval]);

  const currentAnnouncement = announcements[currentIndex];

  const handleAnnouncementPress = () => {
    if (onAnnouncementPress && currentAnnouncement) {
      onAnnouncementPress(currentAnnouncement);
    }
  };

  if (loading) {
    return (
      <View
        className="bg-gray-200 rounded-xl p-4 mb-6 items-center justify-center"
        style={{ height: 100 }}
      >
        <ActivityIndicator size="small" color="#3b82f6" />
      </View>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <View>
      {/*------- Announcement Section -----------*/}
      <TouchableOpacity
        className="flex-row justify-between items-center bg-gradient-to-r from-blue-100 to-purple-100 bg-gray-200 rounded-xl p-4 mb-6"
        onPress={handleAnnouncementPress}
        activeOpacity={0.7}
      >
        <View className="flex-1 mr-2">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xl font-semibold">
              {currentAnnouncement?.title || 'Announcement'}
            </Text>
            {announcements.length > 1 && (
              <View className="flex-row items-center gap-1">
                {announcements.map((_, index) => (
                  <View
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </View>
            )}
          </View>
          <Text className="text-base text-gray-900" numberOfLines={2}>
            {currentAnnouncement?.message || 'No announcements available'}
          </Text>
        </View>
        <Feather name="chevron-right" size={24} color="blue" />
      </TouchableOpacity>

      {/* My Shops Section */}
      <Text className="text-lg px-2 font-semibold mb-3">My Shops</Text>
      <View className="flex-row justify-between gap-2">
        {/* To Pay */}
        <TouchableOpacity
          className="bg-blue-100 px-4 py-2 rounded-full flex-1 items-center"
          onPress={onToPayPress}
          activeOpacity={0.7}
        >
          <Text className="text-blue-700 font-semibold">To Pay</Text>
        </TouchableOpacity>

        {/* To Receive */}
        <TouchableOpacity
          className="bg-blue-100 px-4 py-2 rounded-full flex-1 flex-row items-center justify-center gap-2"
          onPress={onToReceivePress}
          activeOpacity={0.7}
        >
          <View className="w-2 h-2 bg-green-500 rounded-full" />
          <Text className="text-blue-700 font-semibold">To Receive</Text>
        </TouchableOpacity>

        {/* To Review */}
        <TouchableOpacity
          className="bg-blue-100 px-4 py-2 rounded-full flex-1 items-center"
          onPress={onToReviewPress}
          activeOpacity={0.7}
        >
          <Text className="text-blue-700 font-semibold">To Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Announcement;
