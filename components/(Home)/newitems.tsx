import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const products = [
  {
    id: 1,
    title: 'Elegant Women Dress',
    price: '$120',
    image:
      'https://res.cloudinary.com/dluuillmt/image/upload/v1738922109/BC05CHS222_zulz50.jpg',
  },
  {
    id: 2,
    title: 'Stylish Handbag',
    price: '$85',
    image:
      'https://res.cloudinary.com/dluuillmt/image/upload/v1738922084/BC05BHS088-317x462_ltgoin.jpg',
  },
  {
    id: 3,
    title: 'Trendy Sunglasses',
    price: '$50',
    image:
      'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
];

const NewItems = () => {
  return (
    <SafeAreaView className="p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">New Items</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-[#7A1CAC] mr-1 font-medium">See All</Text>
          <Ionicons name="chevron-forward" size={20} color="#7A1CAC" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll of Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((item, index) => (
          <View
            key={item.id}
            className="w-44 bg-white rounded-2xl shadow-md overflow-hidden mr-4"
            style={{ marginRight: index === products.length - 1 ? 0 : 16 }} 
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-44"
              resizeMode="cover"
            />
            <View className="p-2">
              <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
              <Text className="text-sm text-[#7A1CAC] font-medium mt-1">{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewItems;
