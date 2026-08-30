import AllProducts from '@/components/products';
import { useGetAllProductsQuery } from '@/redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

import { ScrollView, TouchableOpacity } from 'react-native';

const AllProductsPage = () => {
  const { data: products } = useGetAllProductsQuery();
  const navigation = useNavigation();
  return (
    <ScrollView>
      {/*------------ Back Button ----------------*/}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className=" top-10  left-4 z-50 text-red-400 bg-white/70 p-2 rounded-full"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* ---------Destructure Data-------- */}
      <AllProducts products={products} />
    </ScrollView>
  );
};

export default AllProductsPage;
