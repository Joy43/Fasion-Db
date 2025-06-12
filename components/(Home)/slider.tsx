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
    subtitle: 'New Summer Styles',
    description: 'Just Arrived',
    image: 'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749179976/03_zlhikb.png',
  },
  {
    subtitle: 'Urban Streetwear',
    description: 'Limited Drops',
    image: 'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749535205/fasiobn1_vxi5bv.jpg',
  },
  {
    subtitle: 'Flash Sale',
    description: 'Ends Tonight',
    image: 'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749535206/fasion3_fn23vp.png',
  },
];

const Slider = () => {
  return (
    <SafeAreaView className="w-full py-4">
      <View className="px-4">
        <View className="rounded-3xl overflow-hidden shadow-xl bg-white h-72">
          <Swiper
            autoplay
            autoplayTimeout={4}
            loop
            showsPagination
            dot={<View className="bg-white/30 w-2 h-2 rounded-full mx-1" />}
            activeDot={<View className="bg-white w-3 h-3 rounded-full mx-1" />}
          >
           {slides.map((slide, index) => (
  <View key={index} className="w-full h-72 relative">
    {/* Image */}
    <Image
      source={{ uri: slide.image }}
      className="w-full h-full"
      resizeMode="cover"
    />

    {/* Gradient Overlay */}
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.6)']}
      className="absolute bottom-0 w-full h-1/2 rounded-b-3xl"
    />

    {/* Glassmorphic Text Overlay */}
    <View className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
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
