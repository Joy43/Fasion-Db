import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

import { Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Terms = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="">
         <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-10 left-4 z-50 bg-white/70 p-2 rounded-full"
      > <Ionicons name="arrow-back" size={24} color="black" />
      
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-5 pt-6"
      >
        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          Terms & Conditions
        </Text>
        <Text className="text-sm text-gray-500 mb-5">
          Last updated: November 10, 2025
        </Text>

        {/* Intro */}
        <Text className="text-gray-700 mb-3 leading-6">
          Welcome to <Text className="font-semibold">FashionBD</Text>. These
          Terms & Conditions (“Terms”) govern your access to and use of the
          FashionBD mobile application (the “App”), owned and operated by
          FashionBD (“we”, “us”, or “our”). By using our App, you agree to be
          bound by these Terms. If you do not agree, please do not use the App.
        </Text>

        {/* Section 1 */}
        <Text className="text-base font-semibold text-gray-900 mt-3 mb-1">
          1. Eligibility
        </Text>
        <Text className="text-gray-700 leading-6 mb-3">
          You must be at least 13 years old (or the minimum age required by
          local law) to use this App.
        </Text>

        {/* Section 2 */}
        <Text className="text-base font-semibold text-gray-900 mt-3 mb-1">
          2. Account Registration
        </Text>
        <Text className="text-gray-700 leading-6 mb-3">
          Some features may require you to create an account. You agree to
          provide accurate, current, and complete information and to keep your
          login credentials secure. You are responsible for all activities that
          occur under your account.
        </Text>

        {/* Section 3 */}
        <Text className="text-base font-semibold text-gray-900 mt-3 mb-1">
          3. Orders & Payments
        </Text>
        <Text className="text-gray-700 leading-6 mb-3">
          All orders placed through the App are subject to availability and
          acceptance. Prices may change without notice. Payments are processed
          securely via third-party providers. Refunds and cancellations follow
          our Return & Refund Policy.
        </Text>

        {/* Section 4 */}
        <Text className="text-base font-semibold text-gray-900 mt-3 mb-1">
          4. Use of the App
        </Text>
        <Text className="text-gray-700 leading-6 mb-3">
          You agree not to misuse the App or engage in any illegal, harmful, or
          unauthorized activities, including hacking, scraping, or distributing
          malicious content.
        </Text>

        {/* Section 5 */}
        <Text className="text-base font-semibold text-gray-900 mt-3 mb-1">
          5. Intellectual Property
        </Text>
        <Text className="text-gray-700 leading-6 mb-3">
          All content, trademarks, and logos within the App are owned by or
          licensed to FashionBD. You may not reproduce, distribute, or modify
          any content without written permission.
        </Text>

        {/* Section 6 */}
        <Text className="text-base font-semibold text-gray-900 mt-3 mb-1">
          6. Limitation of Liability
        </Text>
        <Text className="text-gray-700 leading-6 mb-3">
          FashionBD is not liable for any indirect, incidental, or consequential
          damages arising from your use of the App.
        </Text>

        {/* Section 7 */}
        <Text className="text-base font-semibold text-gray-900 mt-3 mb-1">
          7. Changes to Terms
        </Text>
        <Text className="text-gray-700 leading-6 mb-3">
          We may update these Terms at any time. Continued use of the App after
          updates means you accept the revised Terms.
        </Text>

        {/* Section 8 */}
        <Text className="text-base font-semibold text-gray-900 mt-3 mb-1">
          8. Contact Us
        </Text>
        <Text className="text-gray-700 leading-6">
          For support or questions, contact us at:
        </Text>
        <Text
          className="text-blue-600 underline mt-1"
          onPress={() => Linking.openURL('mailto:support@fashionbd.com')}
        >
          support@fashionbd.com
        </Text>

        {/* Disclaimer */}
        <Text className="italic text-gray-500 text-sm mt-6">
          Disclaimer: This document is provided for informational purposes only
          and does not constitute legal advice.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Terms;
