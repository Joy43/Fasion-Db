import { useGetFlashsellProducts } from '@/hooks/useFlashsell';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Flashsell = () => {
  const { data, isLoading } = useGetFlashsellProducts();
  const FlashsellItems= data?.data || [];
console.log("Flashsell Items:", FlashsellItems);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map(unit => unit.toString().padStart(2, '0'));
  };

  const [hh, mm, ss] = formatTime(timeLeft);

  return (
    <View className="px-4 pt-4">
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-black">Flash Sale</Text>

        <View className="flex-row items-center space-x-1">
          <Feather name="clock" size={18} color="#3B82F6" />
          <View className="flex-row space-x-1">
            {[hh, mm, ss].map((time, idx) => (
              <View key={idx} className="bg-pink-100 px-2 py-1 rounded-md">
                <Text className="text-sm font-semibold text-black">{time}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Product Grid */}
      <FlatList
        data={FlashsellItems.slice(0, 6)}
        numColumns={3}
        keyExtractor={(item, index) => item._id?.toString() || index.toString()}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View className="w-[30%] items-center mb-4 relative">
            {/* Product Box */}
            <View className="w-full h-28 bg-pink-50 rounded-xl justify-center items-center">
              {item.imageUrls?.[0] && (
                <Image
                  source={{ uri: item.imageUrls[0] }}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                  resizeMode="contain"
                />
              )}
            </View>

            {/* Name & Price */}
            <Text
              className="text-xs font-semibold text-center text-black mt-1"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text className="text-sm text-red-500 font-bold">₹{item.price}</Text>

            {/* Discount Tag */}
            <View className="absolute top-1 right-1 bg-red-500 px-2 py-0.5 rounded-full">
              <Text className="text-[10px] font-bold text-white">20% OFF</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Flashsell;
