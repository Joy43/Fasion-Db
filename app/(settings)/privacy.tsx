import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Privacy = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white shadow-md">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">
          Privacy Policy
        </Text>
        <View className="w-8" /> {/* Spacer to balance header */}
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-5 py-6"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="bg-white p-5 rounded-2xl shadow-sm">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            Our Commitment to Your Privacy
          </Text>
          <Text className="text-base text-gray-600 leading-6 mb-4">
            Your privacy is important to us. This policy explains how we
            collect, use, and safeguard your information when you use our
            application.
          </Text>

          <Text className="text-lg font-semibold mb-2 text-gray-800">
            Information We Collect
          </Text>
          <Text className="text-base text-gray-600 leading-6 mb-4">
            We may collect personal details such as your name, email, and usage
            data to improve your app experience.
          </Text>

          <Text className="text-lg font-semibold mb-2 text-gray-800">
            How We Use Your Information
          </Text>
          <Text className="text-base text-gray-600 leading-6 mb-4">
            The information collected helps us personalize your experience,
            improve services, and provide support when needed.
          </Text>

          <Text className="text-lg font-semibold mb-2 text-gray-800">
            Your Consent
          </Text>
          <Text className="text-base text-gray-600 leading-6">
            By using our app, you consent to this Privacy Policy. We will update
            this page if any changes occur.
          </Text>
        </View>

        <Text className="text-center text-gray-500 mt-6">
          © {new Date().getFullYear()} Business Hunting. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;
