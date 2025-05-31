import React from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const categories = [
  {
    id: '1',
    title: 'Clothing',
    count: 109,
    image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
  },
  {
    id: '2',
    title: 'Shoes',
    count: 530,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
  },
  {
    id: '3',
    title: 'Bags',
    count: 87,
    image: 'https://images.pexels.com/photos/577675/pexels-photo-577675.jpeg',
  },
  {
    id: '4',
    title: 'Lingerie',
    count: 218,
    image: 'https://images.pexels.com/photos/9945171/pexels-photo-9945171.jpeg',
  },
  {
    id: '5',
    title: 'Accessories',
    count: 142,
    image: 'https://images.pexels.com/photos/9945178/pexels-photo-9945178.jpeg',
  },
  {
    id: '6',
    title: 'Watches',
    count: 68,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
  },
];

const CategoryCard = ({ item }: { item: typeof categories[0] }) => (
  <TouchableOpacity className="w-[31%] m-1 bg-white rounded-xl overflow-hidden shadow-sm">
    <Image
      source={{ uri: item.image }}
      className="w-full h-20"
      resizeMode="cover"
    />
    <View className="px-2 pb-2 pt-1">
      <Text className="text-sm font-semibold text-gray-800">{item.title}</Text>
      <Text className="text-xs text-[#7A1CAC]">{item.count} products</Text>
    </View>
  </TouchableOpacity>
);

const CategorySection = () => {
  return (
    <View className="px-4 pt-2 pb-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-bold text-gray-900">Categories</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-[#7A1CAC] mr-1 font-medium">See All</Text>
          <Ionicons name="arrow-forward-circle" size={20} color="#7A1CAC" />
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
        scrollEnabled={false}
      />
    </View>
  );
};

export default CategorySection;
