import { Ionicons, Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  const activeColor = '#EF4444'; 
  const inactiveColor = '#9CA3AF'; 
  const primaryColor = '#111827'; 

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: 32,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          left: 20,
          right: 20,
          elevation: 8,
          backgroundColor: '#FFFFFFee',
          borderRadius: 28,
          height: 72,
          shadowColor: primaryColor,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          borderTopWidth: 0,
        },
      }}
    >
      {/*--- Home---- */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`items-center justify-center w-12 h-12 rounded-2xl ${focused ? 'bg-accent/10' : ''}`}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={focused ? activeColor : inactiveColor}
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
            <View className={`items-center justify-center w-12 h-12 rounded-2xl ${focused ? 'bg-accent/10' : ''}`}>
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={24}
                color={focused ? activeColor : inactiveColor}
              />
            </View>
          ),
        }}
      />

      {/* Profile (Center Highlighted FAB) */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center" style={{ width: 60, height: 60 }}>
              <View
                className={`items-center justify-center rounded-full w-14 h-14 bg-primary -mt-6 shadow-md ${
                  focused ? 'border-4 border-accent shadow-lg shadow-accent/30' : 'border-4 border-white'
                }`}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Feather
                  name="user"
                  size={22}
                  color={focused ? activeColor : '#FFFFFF'}
                  style={{ alignSelf: 'center' }}
                />
              </View>
            </View>
          ),
        }}
      />

      {/* Orders */}
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`items-center justify-center w-12 h-12 rounded-2xl ${focused ? 'bg-accent/10' : ''}`}>
              <Feather
                name="shopping-bag"
                size={22}
                color={focused ? activeColor : inactiveColor}
              />
            </View>
          ),
        }}
      />

      {/* Developer */}
      <Tabs.Screen
        name="developer"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`items-center justify-center w-12 h-12 rounded-2xl ${focused ? 'bg-accent/10' : ''}`}>
              <Feather
                name="code"
                size={22}
                color={focused ? activeColor : inactiveColor}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
