import { onboarding } from '@/constants';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { setupFcmToken } from '@/utils/notificationUtils';

const Home = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-background justify-between items-center">
       <TouchableOpacity
        onPress={async () => {
          await setupFcmToken();
          router.replace('/(root)/(tabs)/home');
        }}
        className="w-full padding-5 items-end p-5"
      >
        <Text className="text-text text-base font-bold">
          Skip
        </Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-8 h-1 mx-1 bg-border rounded-full" />
        }
        activeDot={
          <View className="w-8 h-1 mx-1 bg-accent rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            className="flex-1 items-center justify-center p-5"
          >
            <Image
              source={
                typeof item.image === 'string'
                  ? { uri: item.image }
                  : item.image
              }
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex-row items-center justify-center mt-5">
              <Text className="text-text text-2xl font-bold text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-secondaryText text-base font-semibold text-center mt-2.5">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        onPress={async () => {
          if (isLastSlide) {
            await setupFcmToken();
            router.replace('/(root)/(tabs)/home');
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
        className="w-[91%] p-4 bg-primary rounded-xl items-center justify-center mt-5 mb-5 shadow-sm active:opacity-90"
      >
        <Text className="text-surface text-base font-bold">
          {isLastSlide ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
