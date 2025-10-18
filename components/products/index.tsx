import { useBrands } from "@/hooks/useBrand";
import { useCategories } from "@/hooks/useCategories";
import { IBrand } from "@/types/band.types";
import { ICategory } from "@/types/category";
import { IProduct } from "@/types/product";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "./ProductCart";

interface AllProductsProps {
  products: { data: IProduct[] } | undefined;
}

const AllProducts = ({ products }: AllProductsProps) => {
  const [searchText, setSearchText] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const { data: brandData, isLoading: isBrandsLoading } = useBrands();
  const { data: categoryData, isLoading: isCategoriesLoading } =
    useCategories();

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 48) / 2;

  const categories = categoryData?.data || [];
  const brands = brandData?.data || [];
  const allProducts = products?.data || [];

  // Auto-refresh filter
  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const brandMatch = selectedBrand
        ? product.brand?._id === selectedBrand
        : true;
      const categoryMatch = selectedCategory
        ? product.category?._id === selectedCategory
        : true;
      const searchMatch = product.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return brandMatch && categoryMatch && searchMatch;
    });
    setFilteredProducts(filtered);
  }, [searchText, selectedBrand, selectedCategory, products]);

  // Clear all filters
  const clearFilters = () => {
    setSearchText("");
    setSelectedBrand(null);
    setSelectedCategory(null);
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 py-10">
      {/* ---------- Search Input ---------- */}
      <View className="flex-row items-center mb-6">
        <Text className="text-2xl font-bold mr-2">Search</Text>
        <TextInput
          placeholder="Search for products"
          value={searchText}
          onChangeText={setSearchText}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-base"
        />
        {/* <TouchableOpacity className="ml-2">
          <Feather name="camera" size={20} color="black" />
        </TouchableOpacity> */}
      </View>

      {/* ---------- Clear Filters ---------- */}
      {(searchText || selectedBrand || selectedCategory) && (
        <TouchableOpacity
          onPress={clearFilters}
          className="self-start mb-4 px-4 py-2 rounded-full bg-red-500"
        >
          <Text className="text-white font-semibold text-sm">
            Clear Filters
          </Text>
        </TouchableOpacity>
      )}

      {/* ---------- Categories ---------- */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Categories</Text>
        <View className="flex-row flex-wrap gap-2">
          {!isCategoriesLoading &&
            categories.map((category: ICategory) => (
              <TouchableOpacity
                key={category._id}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === category._id ? null : category._id
                  )
                }
                className={`px-3 py-1 rounded-full ${
                  selectedCategory === category._id
                    ? "bg-blue-600"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`${
                    selectedCategory === category._id
                      ? "text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* ---------- Brands ---------- */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Brands</Text>
        <View className="flex-row flex-wrap gap-2">
          {!isBrandsLoading &&
            brands.map((brand: IBrand) => (
              <TouchableOpacity
                key={brand._id}
                onPress={() =>
                  setSelectedBrand(
                    selectedBrand === brand._id ? null : brand._id
                  )
                }
                className={`px-3 py-1 rounded-full ${
                  selectedBrand === brand._id ? "bg-purple-600" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`${
                    selectedBrand === brand._id
                      ? "text-white font-semibold"
                      : "text-black"
                  }`}
                >
                  {brand.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* ---------- Products ---------- */}
      <Text className="text-xl font-bold mb-4">Discover Fashions</Text>
      <View className="flex-row flex-wrap justify-between">
        {filteredProducts?.map((product: IProduct, idx: number) => (
          <View key={idx} style={{ width: cardWidth, marginBottom: 16 }}>
            <ProductCard product={product} />
          </View>
        ))}
        {filteredProducts?.length === 0 && (
          <Text className="text-gray-500 text-center mt-6 w-full">
            No products found.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default AllProducts;
