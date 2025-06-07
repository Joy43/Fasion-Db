import { IProduct } from '@/types/product';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (product._id) {
          router.push({
            pathname: '/productdetials', 
            params: { productId: product._id }, 
          });
        } else {
          console.warn('Product ID is undefined, navigation prevented.');
        }
      }}
      className="w-48 rounded-2xl shadow-md overflow-hidden bg-white"
    >
      {product.imageUrls?.length > 0 && (
        <Image
          source={{ uri: product.imageUrls[0] }}
          className="w-full h-56"
        />
      )}
      <View className="p-2">
        <Text className="text-base font-semibold">{product.name}</Text>
        <Text className="text-sm text-[#7A1CAC] mt-1">${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
