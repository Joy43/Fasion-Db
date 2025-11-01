import HomeProfile from '@/components/(Home)/homeprofile';

// import NewItems from "@/components/(Home)/newitems";
import Slider from '@/components/(Home)/slider';
import StoriesSection from '@/components/(Home)/story';
import Brands from '@/components/modules/shop/band/brand';
import AllCategory from '@/components/modules/shop/category';
import Flashsell from '@/components/modules/shop/flashsell';
import PopularProduct from '@/components/modules/shop/popularproduct';
import { FlatList, View } from 'react-native';

export default function Home() {
  const dummy = [1];

  return (
    <FlatList
      data={dummy}
      keyExtractor={() => 'home-content'}
      renderItem={null}
      ListHeaderComponent={
        <View className="px-6 py-16">
          <HomeProfile />
          <Slider />
          <Brands />
          <StoriesSection />
          <PopularProduct />
          <AllCategory />
          <Flashsell />
        </View>
      }
      ListFooterComponent={<View className="h-32" />}
    />
  );
}
