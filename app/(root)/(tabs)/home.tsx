import FlashSale from "@/components/(Home)/flashsale";
import HomeProfile from "@/components/(Home)/homeprofile";
import Mostpopular from "@/components/(Home)/mostpopular";
import NewItems from "@/components/(Home)/newitems";
import Slider from "@/components/(Home)/slider";
import StoriesSection from "@/components/(Home)/story";
import AllCategory from "@/components/modules/shop/category";
import { FlatList, View } from "react-native";

export default function Home() {
  const dummy = [1]; 

  return (
    <FlatList
      data={dummy}
      keyExtractor={() => "home-content"}
      renderItem={null}
      ListHeaderComponent={
        <>
          <HomeProfile />
          <Slider/>
          <StoriesSection />
          <NewItems />
          <Mostpopular />
      
          <AllCategory/>
          <FlashSale />
          
        </>
      }
      ListFooterComponent={<View className="h-32" />}
    />
  );
}
