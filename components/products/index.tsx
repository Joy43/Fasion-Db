import { IProduct } from '@/types/product';
import React from 'react';
import { ScrollView, View } from 'react-native';
import FilterSidebar from './filterSidebar';
import ProductCard from './ProductCart';

interface AllProductsProps {
  products: { data: IProduct[] } | undefined;
}

const AllProducts = ({ products }: AllProductsProps) => {
  if (!products || !Array.isArray(products.data)) return null;

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View    className="flex-row gap-6">
        {/*------------------ Left Side - Filter ---------------------*/}
        <View className="w-1/3">
          <FilterSidebar />
        </View>

        {/*------------------- Right Side - Products */}
        <View className="w-2/3 flex-row flex-wrap gap-4">
          {products.data.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AllProducts;
