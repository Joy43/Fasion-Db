import { useSingleProduct } from '@/hooks/useProduct';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PageDetails = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const productId = params.productId as string;

  const { data, isLoading, error } = useSingleProduct(productId);
  const product = data?.data;

  // console.log('Product Details:', product);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#7A1CAC" />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500">Failed to load product details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView className="p-4 bg-white">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center mb-4"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text className="ml-2 text-base text-gray-700">Back</Text>
        </TouchableOpacity>

        {/* Product Image */}
        {product.imageUrls?.[0] ? (
          <Image
            source={{ uri: product.imageUrls[0] }}
            className="w-full h-72 rounded-xl"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-72 rounded-xl bg-gray-200 justify-center items-center">
            <Text className="text-gray-500">No image available</Text>
          </View>
        )}

        {/* Info Section */}
        <View className="mt-4 space-y-2">
          <Text className="text-2xl font-bold text-gray-800">{product.name}</Text>
          <Text className="text-lg text-[#7A1CAC] font-semibold">${product.price}</Text>

          {/* Description */}
          <Text className="text-base text-gray-700 mt-2">
            {product.description || 'No description available.'}
          </Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity className="mt-6 bg-[#7A1CAC] py-3 rounded-xl items-center">
          <Text className="text-black font-semibold text-lg">Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageDetails;
