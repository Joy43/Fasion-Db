import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const { height } = Dimensions.get('window');
const SLIDE_HEIGHT = height * 0.3;

const slides = [
  {
    subtitle: 'Up to 50% Off',
    description: 'Happening Now',
    image:
      'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749179976/Placeholder_01_2x_2_gpazog.png',
  },
  {
    subtitle: 'New Summer Styles',
    description: 'Just Arrived',
    image:
      'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749179976/03_zlhikb.png',
  },
  {
    subtitle: 'Urban Streetwear',
    description: 'Limited Drops',
    image:
      'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749535205/fasiobn1_vxi5bv.jpg',
  },
  {
    subtitle: 'Flash Sale',
    description: 'Ends Tonight',
    image:
      'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749535206/fasion3_fn23vp.png',
  },
];

const Slider = () => {
  const handleSlidePress = (slide: (typeof slides)[0]) => {
    console.log('Clicked slide:', slide.subtitle);
  };

  return (
    <SafeAreaView className="w-full pt-4 space-y-4">
      <View className="px-4">
        <View
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{ height: SLIDE_HEIGHT }}
        >
          <Swiper
            autoplay
            autoplayTimeout={4}
            loop
            showsPagination
            dot={<View className="bg-white/30 w-2 h-2 rounded-full mx-1" />}
            activeDot={<View className="bg-white w-3 h-3 rounded-full mx-1" />}
          >
            {slides.map((slide, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                className="w-full h-full relative"
                onPress={() => handleSlidePress(slide)}
              >
                {/* Background Image */}
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

                {/* Glassmorphism Text */}
                <View className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                  <Text
                    className="text-white text-xl font-semibold"
                    accessibilityRole="header"
                  >
                    {slide.subtitle}
                  </Text>
                  <Text className="text-white text-sm mt-1">
                    {slide.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Slider;
