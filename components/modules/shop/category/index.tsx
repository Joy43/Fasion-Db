import { useCategories } from '@/hooks/useCategories';
import { ICategory } from '@/types/category';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllCategory = () => {
  const { data, isLoading, isError } = useCategories();


  if (isError) {
    return (
      <Text className="text-red-600 text-center mt-10 text-base">
        Error loading categories.
      </Text>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return <Text className="text-center mt-10 text-base">No categories found.</Text>;
  }

  const categories = data.data;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-900">Categories</Text>
          <TouchableOpacity className="flex-row items-center ">
            <Text className="text-gray-900 text-xl font-medium mr-1">See All</Text>
            <Ionicons name="arrow-forward-circle" size={30} color="#004CFF" />
          </TouchableOpacity>
        </View>

        {/* Grid of Categories (3 per row) */}
        <View className="flex-row flex-wrap justify-between">
          {categories.map((category: ICategory) => (
            <TouchableOpacity
              key={category._id}
              className="w-[30%] mb-5 items-center"
            >
              <View className="w-full aspect-square rounded-xl overflow-hidden shadow-sm bg-gray-100">
                <Image
                  source={{ uri: category.icon || 'https://via.placeholder.com/150' }}
                  alt={category.name}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="mt-2 text-sm font-medium text-center text-gray-800">
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllCategory;
