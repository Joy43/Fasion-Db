import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Home = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() =>  router.replace("/(root)/(tabs)/home")}
        style={{ width: '100%', padding: 20, alignItems: 'flex-end' }}
      >
        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={{ width: 32, height: 4, marginHorizontal: 4, backgroundColor: '#E2E8F0', borderRadius: 2 }} />}
        activeDot={<View style={{ width: 32, height: 4, marginHorizontal: 4, backgroundColor: '#0286FF', borderRadius: 2 }} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image
              source={typeof item.image === "string" ? { uri: item.image } : item.image}
              style={{ width: '100%', height: 300 }}
              resizeMode="contain"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                {item.title}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#858585', textAlign: 'center', marginTop: 10 }}>
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        onPress={() =>
          isLastSlide
            ? router.replace("/(root)/(tabs)/home")
            : swiperRef.current?.scrollBy(1)
        }
        style={{
          width: '91%',
          padding: 15,
          backgroundColor: '#004CFF',
          borderRadius: 10,
          alignItems: 'center',    
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          {isLastSlide ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;