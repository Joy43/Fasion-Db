import CategorySection from "@/components/(Home)/categorySection";
import FlashSale from "@/components/(Home)/flashsale";
import HomeProfile from "@/components/(Home)/homeprofile";
import Mostpopular from "@/components/(Home)/mostpopular";
import NewItems from "@/components/(Home)/newitems";
import StoriesSection from "@/components/(Home)/story";
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
          <StoriesSection />
          <NewItems />
          <Mostpopular />
          <CategorySection />
          <FlashSale />
          
        </>
      }
      ListFooterComponent={<View className="h-32" />}
    />
  );
}
