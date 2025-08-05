import FavoriteProduct from "@/components/modules/favorite/FavoriteProduct";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function favorites() {
  return (
    <SafeAreaView>
      <FavoriteProduct />
    </SafeAreaView>
  );
}
