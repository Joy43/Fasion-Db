import { useProducts } from '@/hooks/useProduct';
import { IProduct } from '@/types/product';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';



const PopularProduct = () => {

const { data:products, isLoading, isError } = useProducts();
  if (!products || !Array.isArray(products.data)) return null;

  const slicedProducts = products.data.slice(0, 6);


  return (

    <SafeAreaView className="p-4 bg-white">
{/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">Most Popular</Text>
        <TouchableOpacity onPress={() => router.push('/product')} 
        className="flex-row items-center">
          <Text  className="text-[#7A1CAC] mr-1 font-medium">See All</Text>
          <Ionicons name="chevron-forward" size={20} color="#7A1CAC" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row flex-wrap justify-between p-2 gap-2">
      {slicedProducts.map((product:IProduct) => (
        <TouchableOpacity onPress={() => {
        if (product._id) {
          router.push({
            pathname: '/productdetials', 
            params: { productId: product._id }, 
          });
        } else {
          console.warn('Product ID is undefined, navigation prevented.');
        }
      }}
       key={product._id} className="w-44 p-2 bg-red-50 rounded-2xl shadow-md overflow-hidden mr-4">

          <Image
            source={{ uri: product.imageUrls[0] }}
            className="w-full h-32 rounded-lg mb-2"
            resizeMode="cover"
           
          >
          </Image>


          <Text className="mt-2 font-semibold text-base" numberOfLines={1}>
            {product.name}
          </Text>
          <View className='flex-row items-center justify-around   gap-2'>
            <Text className="text-gray-600 text-sm">${product.price}</Text>
                          <Ionicons
                        name="heart-outline"
                        size={26}
                        color={ "#AD49E1" }
                      />
          </View>
          
        </TouchableOpacity>
      ))}
    </View>

    </SafeAreaView>
    
  );
};

export default PopularProduct;
