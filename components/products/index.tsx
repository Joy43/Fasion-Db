import { useBrands } from '@/hooks/useBrand';
import { useCategories } from '@/hooks/useCategories';
import { IBrand } from '@/types/band.types';
import { ICategory } from '@/types/category';
import { IProduct } from '@/types/product';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ProductCard from './ProductCart';

interface AllProductsProps {
  products: { data: IProduct[] } | undefined;
}

const AllProducts = ({ products }: AllProductsProps) => {
  const [searchText, setSearchText] = useState('');

  const { data: brandData, isLoading: isBrandsLoading } = useBrands();
  const { data: categoryData, isLoading: isCategoriesLoading } = useCategories();

 
 

  if (!products || !Array.isArray(products.data)) return null;

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2; 
const categories = categoryData.data || [];
const brands=brandData.data || [];
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      {/* ---------- Search Input ---------- */}
      <View className="flex-row items-center mb-6">
        <Text className="text-2xl font-bold mr-2">Search</Text>
        <TextInput
          placeholder="Search for products"
          value={searchText}
          onChangeText={setSearchText}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-base"
        />
        <TouchableOpacity className="ml-2">
          <Feather name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* ---------- Categories ---------- */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Categories</Text>
          
        </View>
        <View className="flex-row flex-wrap gap-2">
          {!isCategoriesLoading &&
            categories.map((category :ICategory, index:number) => (
              <TouchableOpacity key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                <Text>{category.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* ---------- Brands ---------- */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Brands</Text>
        <View className="flex-row flex-wrap gap-2">
          {!isBrandsLoading &&
            brands.map((brand :IBrand, index:number) => (
              <TouchableOpacity key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                <Text>{brand.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* ---------- Discover Section ---------- */}
      <Text className="text-xl font-bold mb-4">Discover Fasions</Text>

      <View className="flex-row flex-wrap justify-between">
        {products.data.map((product: IProduct, idx: number) => (
          <View key={idx} style={{ width: cardWidth, marginBottom: 16 }}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllProducts;
