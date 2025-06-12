import AllProducts from '@/components/products';
import { useProducts } from '@/hooks/useProduct';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

const AllProductsPage = () => {
    const { data:products } = useProducts();
    const navigation = useNavigation();
  return (
    <ScrollView>
         {/*------------ Back Button ----------------*/}
    
           <TouchableOpacity
             onPress={() => navigation.goBack()}
             className=" top-10  left-4 z-50 text-red-400 bg-white/70 p-2 rounded-full"
           >
             <Ionicons name="arrow-back" size={24} color="black"                                                                 />
           </TouchableOpacity>
        {/* ---------Destructure Data-------- */}
    <AllProducts products={products} />
    </ScrollView>
  )
}

export default AllProductsPage;