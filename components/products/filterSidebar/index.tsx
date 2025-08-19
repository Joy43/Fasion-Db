import Slider from "@react-native-community/slider";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";

// Custom hooks for fetching data
import { useBrands } from "@/hooks/useBrand";
import { useCategories } from "@/hooks/useCategories";

export default function FilterSidebar() {
  const [price, setPrice] = useState(0);

  // Fetching data with fallback
  const { data: brandData, isLoading: isBrandsLoading } = useBrands();
  const { data: categoryData, isLoading: isCategoriesLoading } =
    useCategories();

  // Safe fallback for arrays
  const brands = Array.isArray(brandData) ? brandData : [];
  const categories = Array.isArray(categoryData) ? categoryData : [];

  const navigation = useNavigation();
  const route = useRoute();
  const searchParams = (route.params || {}) as { [key: string]: any };

  const handleSearchQuery = (query: string, value: string | number) => {
    try {
      navigation.setParams({
        ...searchParams,
        [query]: value,
      } as any);
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Failed to set filter",
      });
    }
  };

  return (
    <ScrollView className="p-2 rounded-2xl">
      {/* Header */}
      <View className="mb-6">
        {Object.keys(searchParams).length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.setParams({} as any)}
            className="bg-black px-4 py-1 rounded-md ml-4"
          >
            <Text className="text-white text-sm">Clear Filters</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* -----------filter options------------ */}
      <View className="mb-6 border-b border-red-200 pb-4">
        <Text className="text-lg font-semibold mb-3">Search options</Text>
        {/* --------Price Filter */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Price</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm">$0</Text>
            <Text className="text-sm">$500000</Text>
          </View>
          <Slider
            value={price}
            minimumValue={0}
            maximumValue={500000}
            step={1}
            onValueChange={(val) => {
              setPrice(val);
              handleSearchQuery("price", val);
            }}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#ccc"
          />
          <Text className="text-sm mt-2">Selected Price: ${price}</Text>
        </View>

        {/* Categories Filter */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Product Category</Text>
          {!isCategoriesLoading &&
            categories.length > 0 &&
            categories.map((category: { _id: string; name: string }) => (
              <TouchableOpacity
                key={category._id}
                onPress={() => handleSearchQuery("category", category._id)}
                className="flex-row items-center mb-2"
              >
                <View className="w-4 h-4 rounded-full border border-gray-400 mr-2 " />
                <Text className="text-gray-600">{category.name}</Text>
              </TouchableOpacity>
            ))}
        </View>

        {/* Brands Filter */}
        {/* Brands Filter */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Brands</Text>
          {!isBrandsLoading &&
            brands.length > 0 &&
            brands.map((brand: { _id: string; name: string }) => {
              const isSelected = searchParams.brand === brand._id;
              return (
                <TouchableOpacity
                  key={brand._id}
                  onPress={() => handleSearchQuery("brand", brand._id)}
                  className={`flex-row items-center mb-2 p-2 rounded-md ${
                    isSelected ? "bg-purple-100" : ""
                  }`}
                >
                  <View
                    className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                      isSelected
                        ? "bg-purple-600 border-2 border-purple-600"
                        : "border border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <View className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </View>
                  <Text
                    className={`${
                      isSelected
                        ? "text-purple-700 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {brand.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>

        {/* Ratings Filter */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Rating</Text>
          {[5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity
              key={rating}
              onPress={() => handleSearchQuery("rating", rating)}
              className="flex-row items-center mb-2"
            >
              <View className="w-4 h-4 rounded-full border border-gray-400 mr-2 " />
              <View className="flex-row">
                {Array.from({ length: 5 }, (_, i) => (
                  <FontAwesome
                    key={i}
                    name="star"
                    size={16}
                    color={i < rating ? "orange" : "lightgray"}
                  />
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
