import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 10,
          backgroundColor: "#ffffffee",
          borderRadius: 40,
          height: 80,
          shadowColor: "#AD49E1",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          borderTopWidth: 0,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name="home-outline"
                size={28}
                color={focused ? "#AD49E1" : "#6B7280"}
              />
            </View>
          ),
        }}
      />

      {/* Favorites */}
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name="heart-outline"
                size={26}
                color={focused ? "#AD49E1" : "#6B7280"}
              />
            </View>
          ),
        }}
      />

      {/* -----------------Signup (Center Button) ------------------*/}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              className={`items-center justify-center rounded-full w-16 h-16 bg-white -mt-6 shadow-lg ${
                focused ? "border-4 border-[#AD49E1]" : ""
              }`}
            >
              <MaterialIcons
                name="person-add-alt"
                size={28}
                color={focused ? "#AD49E1" : "#6B7280"}
              />
            </View>
          ),
        }}
      />

      {/* -------------Orders --------------------------*/}
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <Ionicons
                name="cube-outline"
                size={26}
                color={focused ? "#AD49E1" : "#6B7280"}
              />
            </View>
          ),
        }}
      />

      {/* -------------developer------------------ */}
      <Tabs.Screen
        name="developer"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <Feather
                name="code"
                size={26}
                color={focused ? "#AD49E1" : "#6B7280"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
