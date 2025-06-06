import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const products = [
  {
    id: 1,
    
    price: '$120',
    image:
      'https://res.cloudinary.com/dluuillmt/image/upload/v1740202813/discount_cyzdtn.jpg',
  },
  {
    id: 2,
   
    price: '$85',
    image:
      'https://res.cloudinary.com/dluuillmt/image/upload/v1738745716/samples/upscale-face-1.jpg',
  },
  {
    id: 3,
   
    price: '$50',
    image:
      'https://res.cloudinary.com/dluuillmt/image/upload/v1738922084/BC05CES114_zmbad9.jpg',
  },
];

const Mostpopular = () => {
  return (
    <SafeAreaView className="p-8">
      {/*-------------- Header ---------------------------*/}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">Most Popular</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-[#7A1CAC] mr-1 font-medium">See All</Text>
          <Ionicons name="chevron-forward" size={20} color="#7A1CAC" />
        </TouchableOpacity>
      </View>

      {/* ---------------------- Horizontal Scroll of Cards -------------------*/}
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
                {/* ---------favorite icon----------- */}
            <View className="p-2 flex-row justify-around   gap-2">

              <Text className="text-sm text-[#1442be] font-medium mt-1">{item.price}
              </Text>

              <Ionicons
            name="heart-outline"
            size={26}
            color={ "#AD49E1" }
          />
            </View>

          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Mostpopular;
