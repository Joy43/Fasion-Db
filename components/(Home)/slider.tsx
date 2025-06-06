import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const slides = [
  {
    subtitle: 'Up to 50% Off',
    description: 'Happening Now',
    image: 'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749179976/Placeholder_01_2x_2_gpazog.png',
  },
  {
    subtitle: 'Up to 50% Off',
    description: 'Happening Now',
    image: 'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749179976/03_zlhikb.png',
  },
  {
    subtitle: 'Up to 50% Off',
    description: 'Happening Now',
    image: 'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749179976/Image_yqeogd.png',
  },
  {
    subtitle: 'Up to 50% Off',
    description: 'Happening Now',
    image: 'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749179968/Placeholder_01_2x_1_rrvq8e.png',
  },
];

const Slider = () => {
  return (
    <SafeAreaView className="w-full py-4">
      <View className="px-4">
        <View className="rounded-2xl overflow-hidden shadow-lg bg-white h-72">
          <Swiper
            autoplay
            autoplayTimeout={4}
            loop
            showsPagination
            dot={<View className="bg-white/40 w-2 h-2 rounded-full mx-1" />}
            activeDot={<View className="bg-white w-3 h-3 rounded-full mx-1" />}
          >
            {slides.map((slide, index) => (
              <View key={index} className="w-full h-72 relative">
                <Image
                  source={{ uri: slide.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />

                {/* Gradient overlay */}
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                  className="absolute bottom-0 w-full h-1/2"
                />

                {/* Text block */}
                <View className="absolute bottom-4 left-4 right-4 bg-black/40 p-3 rounded-xl">
                  <Text className="text-white text-xl font-semibold">{slide.subtitle}</Text>
                  <Text className="text-white text-sm mt-1">{slide.description}</Text>
                </View>
              </View>
            ))}
          </Swiper>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Slider;
