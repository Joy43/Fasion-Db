import { flashSaleItems } from '@/assets/data/flashSaleData';
import Feather from 'react-native-vector-icons/Feather';

import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';


// Import all icon packs you plan to use
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const iconMap: Record<string, any> = {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Entypo,
  Feather,
  AntDesign,
};

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map(unit => unit.toString().padStart(2, '0'));
  };

  const [hh, mm, ss] = formatTime(timeLeft);

  return (
    <View className="px-4 pt-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-black">Flash Sale</Text>
        <View className="flex-row items-center space-x-1">
       <Feather name="clock" size={18} color="#3B82F6" />

          <View className="flex-row space-x-1">
            {[hh, mm, ss].map((time, idx) => (
              <View key={idx} className="bg-pink-100 px-2 py-1 rounded">
                <Text className="text-sm font-bold text-black">{time}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={flashSaleItems}
        numColumns={3}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => {
          const IconComponent = iconMap[item.icon.type];
          return (
            <View className="mb-4 relative w-[30%] items-center">
              <View className="w-full h-28 rounded-xl bg-pink-50 justify-center items-center">
                {IconComponent && (
                  <IconComponent
                    name={item.icon.name}
                    size={item.icon.size}
                    color={item.icon.color}
                  />
                )}
              </View>
              <View className="absolute top-1 right-1 bg-red-500 px-2 py-0.5 rounded-full">
                <Text className="text-xs text-white font-bold">{item.discount}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default FlashSale;
