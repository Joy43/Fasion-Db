import AllProducts from '@/components/products';
import { useProducts } from '@/hooks/useProduct';
import React from 'react';
import { ScrollView } from 'react-native';

const AllProductsPage = () => {
    const { data:products } = useProducts();
    
  return (
    <ScrollView>
    <AllProducts products={products} />
    </ScrollView>
  )
}

export default AllProductsPage;