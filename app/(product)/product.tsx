import AllProducts from '@/components/products';
import { useProducts } from '@/hooks/useProduct';
import React from 'react';
import { View } from 'react-native';

const AllProductsPage = () => {
    const { data:products, isLoading, isError } = useProducts();
    
  return (
    <View>
    <AllProducts products={products} />
    </View>
  )
}

export default AllProductsPage;