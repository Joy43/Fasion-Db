import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const SLIDE_HEIGHT = height * 0.28;

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  color?: string;
}

const slides: SlideData[] = [
  {
    id: '1',
    title: 'MEGA SALE',
    subtitle: 'Up to 50% Off',
    description: 'Happening Now',
    image:
      'https://res.cloudinary.com/dkqdwcguu/image/upload/v1762112290/men_kztnno.png',
    badge: 'HOT',
    color: '#FF6B6B',
  },
  {
    id: '2',
    title: 'NEW ARRIVALS',
    subtitle: 'Summer Collection',
    description: 'Just Arrived',
    image:
      'https://res.cloudinary.com/dkqdwcguu/image/upload/v1762112290/colr_so27gs.jpg',
    badge: 'NEW',
    color: '#4ECDC4',
  },
  {
    id: '3',
    title: 'STREETWEAR',
    subtitle: 'Urban Fashion',
    description: 'Limited Edition',
    image:
      'https://res.cloudinary.com/dkqdwcguu/image/upload/v1762112291/women_dltgzd.png',
    badge: 'TRENDING',
    color: '#FFD93D',
  },
  {
    id: '4',
    title: 'FLASH SALE',
    subtitle: 'Last Chance',
    description: 'Ends Tonight',
    image:
      'https://res.cloudinary.com/dwgsx0ibw/image/upload/v1749535206/fasion3_fn23vp.png',
    badge: '24H',
    color: '#A78BFA',
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleSlidePress = (slide: SlideData) => {
    console.log('Clicked slide:', slide.title);
    // Navigate to slide details or promotional page
  };

  const handleImageLoadStart = (id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <View className="w-full py-4">
      <View className="px-4">
        {/* Slider Container */}
        <View
          className="rounded-2xl overflow-hidden"
          style={[
            styles.sliderContainer,
            {
              height: SLIDE_HEIGHT,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 10,
            },
          ]}
        >
          <Swiper
            autoplay
            autoplayTimeout={5}
            loop
            showsPagination
            onIndexChanged={(index) => setCurrentIndex(index)}
            paginationStyle={styles.pagination}
            dot={<View className="bg-white/40 w-2 h-2 rounded-full mx-1.5" />}
            activeDot={
              <View className="bg-white w-8 h-2 rounded-full mx-1.5" />
            }
          >
            {slides.map((slide) => (
              <TouchableOpacity
                key={slide.id}
                activeOpacity={0.95}
                className="w-full h-full relative"
                onPress={() => handleSlidePress(slide)}
              >
                {/* Background Image with Loading State */}
                <View className="w-full h-full bg-gray-200">
                  <Image
                    source={{ uri: slide.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                    onLoadStart={() => handleImageLoadStart(slide.id)}
                    onLoadEnd={() => handleImageLoadEnd(slide.id)}
                  />

                  {/* Loading Indicator */}
                  {imageLoading[slide.id] && (
                    <View className="absolute inset-0 items-center justify-center bg-gray-100">
                      <ActivityIndicator size="large" color="#3b82f6" />
                    </View>
                  )}
                </View>

                {/* Dark Gradient Overlay */}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.75)']}
                  className="absolute inset-0"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                />

                {/* Badge */}
                {slide.badge && (
                  <View
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: slide.color || '#FF6B6B' }}
                  >
                    <Text className="text-white text-xs font-bold">
                      {slide.badge}
                    </Text>
                  </View>
                )}

                {/* Content Container */}
                <View className="absolute bottom-0 left-0 right-0 p-5">
                  {/* Title */}
                  <Text className="text-white/70 text-xs font-semibold tracking-widest mb-1">
                    {slide.title}
                  </Text>

                  {/* Subtitle */}
                  <Text className="text-white text-2xl font-bold mb-1">
                    {slide.subtitle}
                  </Text>

                  {/* Description with Icon */}
                  <View className="flex-row items-center">
                    <Feather name="zap" size={14} color="white" />
                    <Text className="text-white/90 text-sm ml-1.5">
                      {slide.description}
                    </Text>
                  </View>

                  {/* Shop Now Button */}
                  <TouchableOpacity
                    className="mt-3 bg-white rounded-full px-5 py-2.5 self-start flex-row items-center"
                    onPress={() => handleSlidePress(slide)}
                    activeOpacity={0.8}
                  >
                    <Text className="text-gray-900 font-semibold text-sm mr-1">
                      Shop Now
                    </Text>
                    <Feather name="arrow-right" size={16} color="#111" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        {/* Current Slide Indicator */}
        <View className="flex-row items-center justify-center mt-3">
          <Text className="text-gray-500 text-xs font-medium">
            {currentIndex + 1} / {slides.length}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    backgroundColor: '#fff',
  },
  pagination: {
    bottom: 10,
  },
});

export default Slider;
