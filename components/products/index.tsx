import { IProduct } from '@/types/product';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import FilterSidebar from './filterSidebar';
import ProductCard from './ProductCart';

interface AllProductsProps {
  products: { data: IProduct[] } | undefined;
}

const AllProducts = ({ products }: AllProductsProps) => {
  const router = useRouter();

  if (!products || !Array.isArray(products.data)) return null;

  const slicedProducts = products.data.slice(0, 6);

  return (

    <SafeAreaView className="p-4 bg-white">

      <View className='flex gap-8 my-10'>
        {/*--------------- filter sidebar--------------------------- */}
<View className='w-full max-w-sm'>
<FilterSidebar/>
</View>
{/* -------product card------- */}
<View  className='grid grid-cols-2 gap-8'>

<ProductCard/>
</View>
      </View>

    </SafeAreaView>
    
  );
};

export default AllProducts;
