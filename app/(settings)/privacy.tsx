import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Privacy = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-10 left-4 z-50 bg-white/70 p-2 rounded-full"
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text> textInComponent </Text>
    </SafeAreaView>
  );
};

export default Privacy;
