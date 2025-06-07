import AllProducts from '@/components/products';
import { useProducts } from '@/hooks/useProduct';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';

const AllProductsPage = () => {
    const { data:products } = useProducts();
    const navigation = useNavigation();
  return (
    <ScrollView>
         {/*------------ Back Button ----------------*/}
   
        {/* ---------destructure data-------- */}
    <AllProducts products={products} />
    </ScrollView>
  )
}

export default AllProductsPage;