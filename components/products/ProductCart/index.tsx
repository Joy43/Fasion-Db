import { IProduct } from '@/types/product';
import { Image, ScrollView, Text, View } from 'react-native';
const ProductCard= ({product}:{product:IProduct}) => {
  return (
   <ScrollView >
     
      <View className=' w-56 rounded-2xl shadow-md overflow-hidden '>
          <Image
              source={{ uri: product.imageUrls[0] }}
              className="w-full h-56"
              resizeMode="cover"
            />
            <View className="p-2">
              <Text className="text-base font-semibold text-gray-800">{product.name}</Text>
              <Text className="text-sm text-[#7A1CAC] font-medium mt-1">{product.price}</Text>
            </View>
      </View>

      {/* -------PAGINATION -------- */}

   </ScrollView>
    
  
  )
}

export default ProductCard;