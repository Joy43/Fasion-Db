import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { useGetFavoritesQuery } from '@/redux';
import LoadingScreen from '@/utils/Loading';
import { FavoriteProductItem } from '@/types/favoriteproduct.type';
import { router } from 'expo-router';

const FavoriteProduct = () => {
  const { data, isLoading, isError } = useGetFavoritesQuery();

  console.log('Favorite Products:', data?.data);

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <LoadingScreen />
      </View>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-50 px-8">
        <Text className="text-4xl mb-3">😕</Text>
        <Text className="text-gray-800 text-lg font-semibold">Oops!</Text>
        <Text className="text-red-500 text-sm text-center mt-1">
          Error fetching favorite products.
        </Text>
      </View>
    );
  }

  // ── Empty ────────────────────────────────────────────────────────────────────
  if (!data || data.data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-8">
        <Text className="text-5xl mb-4">🤍</Text>
        <Text className="text-gray-700 text-lg font-semibold">
          No favorites yet
        </Text>
        <Text className="text-gray-400 text-sm text-center mt-1">
          No favorite products found.
        </Text>
      </View>
    );
  }

  // ── Main ─────────────────────────────────────────────────────────────────────
  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-6 mt-2">
        <Text className="text-2xl font-bold text-gray-800">
          Favorite Products
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          {data.data.length} {data.data.length === 1 ? 'item' : 'items'} saved
        </Text>
      </View>

      {/* Cards */}
      {data.data.map((item: FavoriteProductItem) => (
        <View
          key={item._id}
          className="mb-4 bg-white rounded-2xl overflow-hidden border border-gray-100"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View className="flex-row">
            {/* Product Image */}
            <Image
              source={{ uri: item.product?.imageUrls[0] }}
              className="h-36 w-36"
              resizeMode="cover"
            />

            {/* Divider accent */}
            <View className="w-0.5 bg-gray-100" />

            {/* Product Details */}
            <View className="flex-1 p-4 justify-between">
              {/* Name */}
              <Text
                className="text-base font-semibold text-gray-800 leading-5"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.product.name}
              </Text>

              {/* Price */}
              <Text className="text-red-500 font-bold text-xl mt-1">
                ${item.product.price}
              </Text>

              {/* View Details Button */}
              <TouchableOpacity
                onPress={() => {
                  if (item.product._id) {
                    router.push({
                      pathname: '/productdetials',
                      params: { productId: item.product._id },
                    });
                  } else {
                    console.warn(
                      'Product ID is undefined, navigation prevented.'
                    );
                  }
                }}
                className="mt-3 bg-red-500 rounded-xl px-4 py-2 items-center self-start"
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold text-sm">
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* --------admob --------- */}
      
    </ScrollView>
  );
};

export default FavoriteProduct;
