import { useGetFlashsellProducts } from '@/hooks/useFlashsell';
import { IProduct } from '@/types/product';
import LoadingScreen from '@/utils/Loading';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Flashsell = () => {
  const { data, isLoading, error } = useGetFlashsellProducts();
  const FlashsellItems = data?.data?.slice(0, 6) || [];

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

  const getDiscountPercentage = (original: number, offer: number) => {
    if (!original || !offer) return 0;
    return Math.round(((original - offer) / original) * 100);
  };

  if (isLoading) {
    return (
    <LoadingScreen/>
    );
  }

  if (error) {
    return (
      <View className="p-4">
        <Text className="text-red-500 font-bold">Failed to load products.</Text>
      </View>
    );
  }

  return (
    <View className="px-4 pt-4 bg-slate-100">
      {/* Header Row time */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-black">Flash Sale</Text>

        <View className="flex-row items-center space-x-1">
          <Feather name="clock" size={28} color="#3B82F6" />
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
      <View className="flex-row flex-wrap justify-between gap-y-4">
        {FlashsellItems.map((item: IProduct, index: number) => {
          const discountPercent = getDiscountPercentage(item.price, item.offerPrice);

          return (
            <TouchableOpacity
              key={item._id || index}
              onPress={() => {
                if (item?._id) {
                  router.push({
                    pathname: '/productdetials',
                    params: { productId: item._id },
                  });
                }
              }}
              className="w-[40%] relative items-center"
            >
              {/* Product Image Box */}
              <View className="w-full h-28 bg-pink-50 rounded-xl justify-center items-center">
                {item?.imageUrls?.[0] && (
                  <Image
                    source={{ uri: item.imageUrls[0] }}
                    style={{ width: 120, height: 100, borderRadius: 8 }}
                    resizeMode="contain"
                  />
                )}
              </View>

              {/* Product Name */}
              <Text
                className="text-xs font-semibold text-center text-black mt-1"
                numberOfLines={1}
              >
                {item?.name}
              </Text>

              {/* Price and Discount */}
              <View className="flex-row items-center gap-1">
                <Text className="text-sm text-red-500 font-bold">
                  ₹{item?.offerPrice?.toFixed(2)}
                </Text>
                <Text className="text-xs text-gray-500 line-through">
                  ₹{item?.price?.toFixed(2)}
                </Text>
              </View>

              {/* Discount Tag */}
              {discountPercent > 0 && (
                <View className="absolute top-1 right-1 bg-red-500 px-2 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-white">
                    {discountPercent}% OFF
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Flashsell;
