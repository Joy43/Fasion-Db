import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useGetOrders } from "@/hooks/useOrder";

const MyOrder = () => {
  const { data, isLoading, error } = useGetOrders() || {};
  const orders = data?.data || [];

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading orders</Text>;

  return (
    <ScrollView className="space-y-4 px-4 py-6 ">
      <Text className="text-xl font-bold mb-4">My Orders</Text>
      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        orders.map((order: any, index: number) => (
          <View
            key={index}
            className="bg-white rounded-sm border border-gray-200 p-4"
          >
            <View className=" rounded-2xl shadow-md border border-gray-200 p-4 mb-4 space-y-2">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm text-gray-500">
                  Order #{index + 1}
                </Text>
                <Text>{order.status}</Text>
              </View>

              <View className="space-y-1">
                <Text className="text-base text-gray-800">
                  <Text className="font-semibold">Shipping:</Text>{" "}
                  {order.shippingAddress}
                </Text>
                <Text className="text-base text-gray-800">
                  <Text className="font-semibold">Payment:</Text>{" "}
                  {order.paymentMethod}
                </Text>
                <Text className="text-base text-gray-800">
                  <Text className="font-semibold">Total:</Text> ৳
                  {order.finalAmount}
                </Text>
                <Text className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default MyOrder;
