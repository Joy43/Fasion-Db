import React from "react";
import { View, Text, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  cities
} from "@/constants/cities";
import {
  citySelector,
  shippingAddressSelector,
  updateCity,
  updateShippingAddress,
} from "@/redux/features/cartSlice";

export default function Address() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);

  const handleCitySelect = (city: string) => {
    dispatch(updateCity(city));
  };

  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };

  return (
    <View className="border-2 border-white bg-gray-900 rounded-md p-5 w-full">
      <View className="flex flex-col justify-between h-full">
        <Text className="text-2xl font-bold text-white mb-1">Address</Text>
        <Text className="text-gray-400 mb-4">Enter your address.</Text>

        {/* City Picker */}
        <View className="mb-5">
          <RNPickerSelect
            onValueChange={handleCitySelect}
            placeholder={{ label: "Select a city", value: null }}
            value={selectedCity}
            items={cities.map((city) => ({
              label: city,
              value: city,
            }))}
            style={{
              inputIOS: {
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#ffffff",
                borderRadius: 8,
                color: "#000000",
                backgroundColor: "#ffffff",
              },
              inputAndroid: {
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "#ffffff",
                borderRadius: 8,
                color: "#000000",
                backgroundColor: "#ffffff",
              },
              placeholder: {
                color: "#888888",
              },
            }}
          />
        </View>

        {/* Shipping Address Input */}
        <TextInput
          className="h-32 border border-white rounded-md text-black bg-white px-3 py-2"
          multiline
          numberOfLines={5}
          onChangeText={handleShippingAddress}
          value={shippingAddress}
          placeholder="Enter full address"
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );
}
