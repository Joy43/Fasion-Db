import CategorySection from "@/components/(Home)/categorySection";
import HomeProfile from "@/components/(Home)/homeprofile";
import Mostpopular from "@/components/(Home)/mostpopular";
import NewItems from "@/components/(Home)/newitems";
import StoriesSection from "@/components/(Home)/story";
import { ScrollView, View } from "react-native";

export default function Home() {
  return (
    <ScrollView>
      <HomeProfile/>
      <StoriesSection/>
      <NewItems/>
    <Mostpopular/>
    <CategorySection/>
      <View className="h-32" />
    </ScrollView>
  );
}