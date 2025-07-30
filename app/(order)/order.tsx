import { useSingleProduct } from "@/hooks/useProduct";
import LoadingScreen from "@/utils/Loading";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PageOrder = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const productId = params.productId as string;

  const { data, isLoading, error } = useSingleProduct(productId);
  const product = data?.data;

  const [selectedColor, setSelectedColor] = useState(0);

  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-500">Failed to load product details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="bg-white">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-10 left-4 z-50 bg-white/70 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Large Background Image */}
        <Image
          source={{ uri: product.imageUrls?.[0] }}
          className="w-full h-96"
          resizeMode="cover"
        />

        {/* Floating Card */}
        <View className="bg-[#F2F2F2] rounded-3xl px-6 py-5 shadow-lg mx-4 z-10">
          {/* Thumbnail + Price */}
          <View className="flex-row items-center space-x-4">
            <Image
              source={{ uri: product.imageUrls?.[1] || product.imageUrls?.[0] }}
              className="w-14 h-14 rounded-full"
            />
            <View>
              <Text className="text-xl font-extrabold">${product.price}</Text>
              <View className="flex-row mt-1 space-x-2">
                <Text className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                  {product.color || "Pink"}
                </Text>
              </View>
            </View>
          </View>

          {/* ---------------- Color Options------------------------ */}
          <Text className="mt-5 text-base font-semibold text-gray-800">
            Color Options
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
          >
            {product.imageUrls?.map((url: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedColor(index)}
                className={`mr-3 rounded-xl border-2 ${
                  selectedColor === index
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <Image source={{ uri: url }} className="w-20 h-20 rounded-xl" />
                {selectedColor === index && (
                  <View className="absolute top-1 left-1 bg-blue-500 p-1 rounded-full">
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* --------------------Quantity Selector ----------------*/}
          <Text className="mt-5 text-base font-semibold text-gray-800">
            Quantity
          </Text>
          <View className="flex-row items-center justify-between mt-2 w-36">
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-white border border-gray-300 rounded-full w-10 h-10 justify-center items-center"
            >
              <Text className="text-xl">-</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold">{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              className="bg-white border border-gray-300 rounded-full w-10 h-10 justify-center items-center"
            >
              <Text className="text-xl">+</Text>
            </TouchableOpacity>
          </View>

          {/* -----------------------Buttons -------------------------*/}
          {/* -------WHISHLIST------------- */}
          <View className="flex-row items-center justify-between mt-6 space-x-6">
            <TouchableOpacity
              onPress={() => {
                if (product._id) {
                  router.push({
                    pathname: "/order",
                    params: { productId: product._id },
                  });
                } else {
                  console.warn(
                    "Product ID is undefined, navigation prevented."
                  );
                }
              }}
              className="flex-1 bg-[#004CFF] w-fit py-3 px-3 rounded-xl items-center"
            >
              <Text className="text-white font-semibold text-base">
                Buy now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Details Section */}
        <View className="mt-6 px-4">
          {/* Key Features */}
          <Text className="text-base font-bold text-gray-800 mb-2">
            Key Features
          </Text>
          {(Array.isArray(product.keyFeatures)
            ? product.keyFeatures
            : [product.keyFeatures]
          )?.map((feature: string, index: number) => (
            <Text key={index} className="text-gray-600">
              • {feature}
            </Text>
          ))}

          {/* Specification */}
          {product.specification && (
            <>
              <Text className="mt-4 text-base font-bold text-gray-800 mb-2">
                Specifications
              </Text>
              {Array.isArray(product.specification) ? (
                product.specification.map((spec: string, index: number) => (
                  <Text key={index} className="text-gray-600">
                    • {spec}
                  </Text>
                ))
              ) : typeof product.specification === "object" ? (
                Object.entries(product.specification).map(
                  ([key, value], index) => (
                    <Text key={index} className="text-gray-600">
                      • {key}: {String(value)}
                    </Text>
                  )
                )
              ) : (
                <Text className="text-gray-600">• {product.specification}</Text>
              )}
            </>
          )}

          {/*-------------------- Available Colors ---------------------------*/}
          {product.availableColors && (
            <>
              <Text className="mt-4 text-base font-bold text-gray-800 mb-2">
                Available Colors
              </Text>
              {(Array.isArray(product.availableColors)
                ? product.availableColors
                : [product.availableColors]
              )?.map((color: string, index: number) => (
                <Text key={index} className="text-gray-600">
                  • {color}
                </Text>
              ))}
            </>
          )}

          {/* Data Rating */}
          {product.dataRating && (
            <Text className="mt-4 text-base text-gray-800">
              <Text className="font-bold">Rating:</Text> {product.dataRating}
            </Text>
          )}

          {/* Stock */}
          {product.stock && (
            <Text className="mt-2 text-base text-gray-800">
              <Text className="font-bold">Stock:</Text> {product.stock}
            </Text>
          )}

          {/*-------------------- Weight---------------------- */}
          {product.weight && (
            <Text className="mt-2 text-base text-gray-800">
              <Text className="font-bold">Weight:</Text> {product.weight}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageOrder;
