// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={28}
              color={focused ? "#AD49E1" : "#FFFFFF"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search-outline"
              size={28}
              color={focused ? "#AD49E1" : "#FFFFFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
