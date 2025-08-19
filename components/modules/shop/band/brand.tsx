import { useBrands } from "@/hooks/useBrand";
import { IBrand } from "@/types/band.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Brands = () => {
  const { data, isLoading, isError } = useBrands();

  const handleBrandPress = (brandId: string) => {
    // Navigate to product page with brand filter applied
    router.push({
      pathname: "/product",
      params: { brand: brandId }, // 👈 pass filter param
    });
  };

  const renderBrandItem = ({ item }: { item: IBrand }) => (
    <TouchableOpacity
      onPress={() => handleBrandPress(item._id)} // 👈 make each brand clickable
      className="flex flex-col items-center bg-white rounded-xl shadow-sm p-4 mr-4 w-32"
    >
      <Image
        source={{
          uri: item.logo || "https://via.placeholder.com/150",
        }}
        className="w-16 h-16 rounded-full mb-2"
        resizeMode="cover"
      />
      <Text className="text-center text-gray-800 text-sm font-semibold">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 py-4 bg-white shadow-sm">
        <Text className="text-2xl font-bold text-gray-900">Brands</Text>
        <TouchableOpacity
          onPress={() => router.push("/product")}
          className="flex-row items-center"
        >
          <Text className="text-[#7A1CAC] mr-1 font-medium">See All</Text>
          <Ionicons name="chevron-forward" size={20} color="#7A1CAC" />
        </TouchableOpacity>
      </View>

      {/* Error */}
      {isError && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 font-medium text-lg">
            Error loading brands.
          </Text>
        </View>
      )}

      {/* Brand List */}
      {data?.data && data.data.length > 0 ? (
        <FlatList
          data={data.data}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16 }}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Brands;
