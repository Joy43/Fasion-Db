import Reviews from "@/components/modules/shop/review/reviews";
import { useSingleProduct } from "@/hooks/useProduct";
import LoadingScreen from "@/utils/Loading";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PageDetails = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const productId = params.productId as string;

  const { data, isLoading, error } = useSingleProduct(productId);
  const product = data?.data;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">Failed to load product details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-10 left-4 z-50 bg-white/90 p-2 rounded-full shadow"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Header Image */}
        <Image
          source={{ uri: product.imageUrls?.[0] }}
          className="w-full h-96"
          resizeMode="cover"
        />

        {/* Floating Card */}
        <View className="-mt-16 mx-4 bg-white rounded-3xl p-6 shadow-md z-10">
          {/* Price and Thumbnail */}
          <View className="flex-row items-center gap-4">
            <Image
              source={{ uri: product.imageUrls?.[1] || product.imageUrls?.[0] }}
              className="w-16 h-16 rounded-full border border-gray-200"
            />
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                ${product.price}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Offer Price:{" "}
                <Text className="text-green-600 font-semibold">
                  ${product.offerPrice}
                </Text>
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between mt-6">
            <TouchableOpacity className="w-12 h-12 border rounded-full justify-center items-center border-gray-300">
              <AntDesign name="hearto" size={22} color="red" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (product._id) {
                  router.push({
                    pathname: "/order",
                    params: { productId: product._id },
                  });
                }
              }}
              className="flex-1 ml-4 bg-blue-600 py-3 rounded-xl items-center"
            >
              <Text className="text-white font-semibold text-base">
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Details */}
        <View className="mt-8 px-4 space-y-5">
          {/* Key Features */}
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-1">
              Key Features
            </Text>
            {product.keyFeatures?.map((feature: string, index: number) => (
              <Text key={index} className="text-gray-600">
                • {feature}
              </Text>
            ))}
          </View>

          {/* Specifications */}
          {product.specification && (
            <View>
              <Text className="text-lg font-bold text-gray-800 mb-1">
                Specifications
              </Text>
              {typeof product.specification === "object" &&
                Object.entries(product.specification).map(
                  ([key, value], index) => (
                    <Text key={index} className="text-gray-600">
                      • {key}: {String(value)}
                    </Text>
                  )
                )}
            </View>
          )}

          {/* Available Colors */}
          {product.availableColors?.length > 0 && (
            <View>
              <Text className="text-lg font-bold text-gray-800 mb-1">
                Available Colors
              </Text>
              {product.availableColors.map((color: string, index: number) => (
                <Text key={index} className="text-gray-600">
                  • {color}
                </Text>
              ))}
            </View>
          )}

          {/* Stock & Weight */}
          <View className="flex-row flex-wrap gap-4">
            <Text className="text-gray-700">
              <Text className="font-bold">Stock:</Text> {product.stock}
            </Text>
            <Text className="text-gray-700">
              <Text className="font-bold">Weight:</Text> {product.weight} kg
            </Text>
          </View>
        </View>

        {/* Average Rating */}
        {product.averageRating > 0 && (
          <View className="px-4 mt-6">
            <Text className="text-lg font-bold text-gray-800">
              Average Rating:{" "}
              <Text className="text-yellow-500">
                {product.averageRating.toFixed(1)} ⭐
              </Text>
            </Text>
          </View>
        )}

        {/* Customer Reviews */}
        {product.reviews?.length > 0 ? (
          <View className="px-4 mt-6">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Customer Reviews ({product.reviews.length})
            </Text>
            {product.reviews.map((review: any, index: number) => (
              <View
                key={review._id || index}
                className="mb-4 border-b border-gray-200 pb-2"
              >
                <Text className="text-yellow-500 font-medium">
                  Rating: {review.rating} ⭐
                </Text>
                <Text className="text-gray-700 mt-1">"{review.review}"</Text>
              </View>
            ))}
          </View>
        ) : (
          <View className="px-4 mt-6">
            <Text className="text-gray-600 italic">No reviews yet.</Text>
          </View>
        )}

        {/* Review Form Component */}
        <Reviews productId={product._id} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageDetails;
