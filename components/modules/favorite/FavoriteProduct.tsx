import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useGetFavorite } from "@/hooks/useFavorite";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "@/utils/Loading";
import { FavoriteProductItem } from "@/types/favoriteproduct.type";
import { router } from "expo-router";

const FavoriteProduct = () => {
  const { data, isLoading, isError } = useGetFavorite();
  console.log("Favorite Products:", data?.data);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center ">
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-blue-50">
        <Text className="text-red-500 text-base">
          Error fetching favorite products.
        </Text>
      </SafeAreaView>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500 text-base">
          No favorite products found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView className=" p-4">
      {data.data.map((item: FavoriteProductItem) => (
        <View
          key={item._id}
          className="mb-5 bg-white rounded-xl shadow-md overflow-hidden "
        >
          <View className="flex-row">
            {/* Product Image */}
            <View className="shrink-0">
              <Image
                source={{ uri: item.product?.imageUrls[0] }}
                className="h-40 w-40 object-cover"
                resizeMode="cover"
              />
            </View>

            {/* Product Details */}
            <View className="p-8">
              <Text className="text-xl font-semibold text-gray-800">
                {item.product.name}
              </Text>
              <Text className="text-gray-600 text-base mt-1">
                ${item.product.price}
              </Text>

              {/* Order Now Button */}
              <TouchableOpacity
                onPress={() => {
                  if (item.product._id) {
                    router.push({
                      pathname: "/productdetials",
                      params: { productId: item.product._id },
                    });
                  } else {
                    console.warn(
                      "Product ID is undefined, navigation prevented."
                    );
                  }
                }}
                className="mt-4 bg-red-500 rounded-md px-4 py-2 w-fit items-center"
              >
                <Text className="text-white font-semibold text-lg">
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FavoriteProduct;
